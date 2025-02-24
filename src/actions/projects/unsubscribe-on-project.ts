"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

export async function unsubscribeOnProject(
    projectId: string,
    freelancerId: string
): Promise<{ status: "success" | "rejected"; message: string }> {
    if (!projectId || !freelancerId) {
        return {
            status: "rejected",
            message: "O id do projeto e do freelancer precisam ser informados",
        };
    }

    await api(`/project/${projectId}/unsubscribe/${freelancerId}`, {
        method: "PUT",
    });

    revalidatePath("/");

    return {
        status: "success",
        message: "Subscrição anulada com sucesso",
    };
}
