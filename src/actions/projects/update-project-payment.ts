"use server";

import { Dependencies } from "@/components/dash/edit-project-due-date";
import { api } from "@/config/api";
import { IbanPaymentProps } from "@/services/payments/iban-payment-service";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";

export async function updateProjectPayment({
    data,
    dependencies,
}: {
    data: IbanPaymentProps;
    dependencies: Dependencies;
}) {
    if (!dependencies.projectId) {
        return {
            status: "error",
            message: "Project not found",
        };
    }

    const url = await supabaseUpload(data.file!);

    if (!url) {
        return {
            status: "error",
            message: "Upload failed",
        };
    }

    const projectUpadated = await api<{ id: string }>(
        `/project/${dependencies.projectId}/owner/${dependencies.ownerId}/payment?paymentMethod=iban`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ammount: Number(data.ammount),
                clientInvoice: url,
                referenceNumber: data.referenceNumber as string,
            }),
        }
    );

    if (!projectUpadated.id) {
        return {
            status: "error",
            message: "Não foi possível atualizar o pagamento",
            projectUpadated,
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Pagamento atualizado com sucesso",
    };
}
