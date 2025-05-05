"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

type DataProps = {
    quotation: number;
    estimatedTime: string;
    requiredInformations: string;
    similarExperiences: string;
};

type DependenciesProps = {
    projectId: string;
    tolinerId: string;
};

export async function subscribeOnProject(
    data: DataProps,
    dependencies: DependenciesProps
): Promise<{ status: "Created" | "rejected"; message: string }> {
    const { projectId, tolinerId } = dependencies;
    if (!projectId || !tolinerId) {
        return {
            status: "rejected",
            message: "Sem informações suficientes para criar esta subscrição",
        };
    }

    const subscrition = await api<{ id: true }>(
        `/project/${dependencies.projectId}/subscribe/${tolinerId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!subscrition.id) {
        return {
            status: "rejected",
            message: "Ocorreu um erro ao se inscrever no projeto",
        };
    }

    revalidatePath("/");

    return {
        status: "Created",
        message: "Inscrição criada com sucesso",
    };
}
