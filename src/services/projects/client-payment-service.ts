"use client";

import { updateProjectPayment } from "@/actions/projects/update-project-payment";
import { PaymentDependencies } from "@/components/dash/edit-project-payment-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ProjectPaymentSchema = z
    .object({
        ammount: z.string().optional(),
        dueDate: z.date().nullable().optional(),
        file: z
            .instanceof(File)
            .nullable()
            .optional()
            .refine(
                (file) =>
                    !file ||
                    ["image/jpeg", "image/png", "image/gif"].includes(
                        file.type
                    ),
                "O ficheiro deve ser uma imagem válida (JPEG, PNG, GIF)"
            ),
    })
    .refine(
        (data) => {
            if (data.file && !data.ammount) {
                return false;
            }
            return true;
        },
        {
            message:
                "O campo 'file' só pode ser preenchido se o campo 'ammount' também estiver preenchido.",
            path: ["file"],
        }
    );

export type ProjectPaymentProps = z.infer<typeof ProjectPaymentSchema>;

interface UseClientPaymentServiceResponse {
    form: ReturnType<typeof useForm<ProjectPaymentProps>>;
    isSubmitting: boolean;
    handleSubmit: (data: ProjectPaymentProps) => Promise<void>;
    triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function useClientPaymentService(
    paymentDependencies: PaymentDependencies
): UseClientPaymentServiceResponse {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const form = useForm<ProjectPaymentProps>({
        resolver: zodResolver(ProjectPaymentSchema),
        defaultValues: {
            ammount: "",
            file: null,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: ProjectPaymentProps) {
        const response = await updateProjectPayment({
            data,
            dependencies: paymentDependencies,
        });

        if (response.status === "success") {
            form.reset();
            toast.success("Pagamento atualizado com sucesso");
            setTimeout(() => {
                triggerRef.current?.click();
            }, 2500);

            return;
        }

        toast.error(response.message);
    }

    return {
        form,
        isSubmitting,
        handleSubmit,
        triggerRef,
    };
}
