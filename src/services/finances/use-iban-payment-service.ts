"use client";

import { ibanPayment } from "@/actions/finances/iban-payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    ammount: z.coerce.number().min(1, "O valor deve ser maior que zero."),
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
export function useIbanPaymentService(
    triggerRef?: RefObject<HTMLDivElement | null>
) {
    const form = useForm<IbanPaymentProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            ammount: 0,
        },
    });

    function handleCloseModal() {
        triggerRef?.current?.click();
    }

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: IbanPaymentProps) {
        const charge = await ibanPayment(data);

        if (charge.status === "error") {
            toast.error(charge.message);
            return;
        }

        toast.success(charge.message, { duration: 6000 });
        form.reset();
        setTimeout(() => {
            triggerRef?.current?.click();
        }, 3500);
    }
    return {
        isSubmitting,
        form,
        handleCloseModal,
        handleSubmit,
    };
}
