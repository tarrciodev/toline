"use client";

import { tolinePayment } from "@/actions/projects/toline-payment";
import { useEntityStore } from "@/store/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    ammount: z.coerce.number().min(1, "O valor deve ser maior que zero."),
    projectId: z.string().uuid(),
    ownerId: z.string().uuid(),
});

export type TolinePaymentResponse = {
    form: ReturnType<typeof useForm<TolinePaymentProps>>;
    isSubmitting: boolean;
};

export type TolinePaymentProps = z.infer<typeof schema>;
export function useTolinePaymentService({
    triggerRef,
    projectId,
}: {
    triggerRef?: RefObject<HTMLDivElement | null>;
    projectId: string;
}) {
    const { entity } = useEntityStore();
    const userBalance = entity?.balance?.ammount ?? 0;
    const form = useForm<TolinePaymentProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            ammount: 0,
            ownerId: entity?.id as string,
            projectId: projectId,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: TolinePaymentProps) {
        if (data.ammount > userBalance) {
            toast.error("Saldo insuficiente");
            return;
        }
        const response = await tolinePayment(data);

        if (response.status === "success") {
            toast.success(response.message);
            form.reset();
            setTimeout(() => {
                triggerRef?.current?.click();
            }, 3000);
            return;
        }

        toast.error(response.message);
    }
    return {
        isSubmitting,
        form,
        handleSubmit,
    };
}
