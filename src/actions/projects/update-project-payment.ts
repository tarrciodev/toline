"use server";

import {
    PaymentDependencies,
    ProjectPaymentProps,
} from "@/components/dash/edit-project-payment-button";
import { api } from "@/config/api";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";

export async function updateProjectPayment({
    data,
    dependencies,
}: {
    data: ProjectPaymentProps;
    dependencies: PaymentDependencies;
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
        `/project/${dependencies.projectId}/owner/${dependencies.ownerId}/payment`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ammount: Number(data.ammount),
                clientInvoice: url,
                dueDate: data.dueDate,
            }),
        }
    );

    if (!projectUpadated.id) {
        return {
            status: "error",
            message: "Não foi possível atualizar o pagamento",
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Pagamento atualizado com sucesso",
    };
}
