"use server";

import { api } from "@/config/api";
import { TolinePaymentProps } from "@/services/payments/toline-payment-service";
import { revalidatePath } from "next/cache";

export async function tolinePayment(data: TolinePaymentProps) {
    const projectUpadted = await api<{ id: string }>(
        `/project/${data.projectId}/owner/${data.ownerId}/payment?paymentMethod=toline`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ammount: Number(data.ammount),
            }),
        }
    );

    if (!projectUpadted.id) {
        return {
            status: "error",
            message: "Não foi possível atualizar o pagamento",
            projectUpadted,
            data,
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Pagamento atualizado com sucesso",
    };
}
