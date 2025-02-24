"use server";

import { EditProjectFormProps } from "@/components/dash/edit-project-Qoutation-button";
import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

export async function updateProjectQuotation({
    formData,
    dependencies,
}: {
    formData: EditProjectFormProps;
    dependencies: {
        projectId: string;
        ownerId: string;
    };
}) {
    if (!dependencies.projectId) {
        return {
            status: "error",
            message: "Project not found",
        };
    }

    const projectUpdated = await api<{ id: string }>(
        `/project/${dependencies.projectId}/owner/${dependencies.ownerId}/quotation`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ammount: Number(formData.ammount),
                description: formData.description,
            }),
        }
    );

    if (!projectUpdated.id) {
        return {
            status: "error",
            message: "Ocorreu um erro ao atualizar o seu projeto",
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Projeto atualizado com sucesso",
    };
}
