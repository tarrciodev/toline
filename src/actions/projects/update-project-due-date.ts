"use server";

import { api } from "@/config/api";
import { ProjectDueDateProps } from "@/services/projects/update-project-due-date-service";
import { revalidatePath } from "next/cache";

export async function updateProjectDueDate(
    data: ProjectDueDateProps
): Promise<{ status: "success" | "error"; message: string }> {
    const { projectId, dueDate } = data;

    const response = await api<{ id: string }>(
        `/project/${projectId}/duedate`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dueDate: dueDate,
            }),
        }
    );

    if (response.id) {
        revalidatePath("/");
        return {
            status: "success",
            message: "Prazo de entrega atualizado com sucesso",
        };
    }

    return {
        status: "error",
        message: "Não foi possível atualizar o prazo de entrega",
    };
}
