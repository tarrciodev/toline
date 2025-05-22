"use client";

import { updateProjectPayment } from "@/actions/projects/update-project-payment";
import { useEntityStore } from "@/store/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    ammount: z.coerce.number().min(1, "O valor deve ser maior que zero."),
    referenceNumber: z.string(),
    file: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "application/pdf",
                ].includes(file.type),
            {
                message:
                    "O arquivo deve ser uma imagem (JPEG, PNG, WEBP) ou PDF.",
            }
        )
        .refine((file) => file.size <= 1024 * 1024, {
            message: "O arquivo deve ter no máximo 1MB.",
        }),
});

export type IbanPaymentResponse = {
    form: ReturnType<typeof useForm<IbanPaymentProps>>;
    isSubmitting: boolean;
    handleCloseModal: () => void;
    handleSubmit: (data: IbanPaymentProps) => Promise<void>;
};

export type IbanPaymentProps = z.infer<typeof schema>;
export function useIbanPaymentService({
    triggerRef,
    projectId,
}: {
    triggerRef?: RefObject<HTMLDivElement | null>;
    projectId: string;
}) {
    const { entity } = useEntityStore();
    const form = useForm<IbanPaymentProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            ammount: 0,
            referenceNumber: "",
            file: undefined,
        },
    });

    function handleCloseModal() {
        triggerRef?.current?.click();
    }

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: IbanPaymentProps) {
        const response = await updateProjectPayment({
            data,
            dependencies: {
                projectId: projectId,
                ownerId: entity?.id as string,
            },
        });

        if (response.status === "success") {
            toast.success(response.message);
            setTimeout(() => {
                form.reset();
                triggerRef?.current?.click();
            }, 3000);

            return;
        }
        toast.error(response.message);
    }
    return {
        isSubmitting,
        form,
        handleCloseModal,
        handleSubmit,
    };
}
