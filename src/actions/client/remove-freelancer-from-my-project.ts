"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

export async function removeFreelancerFromMyProject(data: {
    projectId: string;
    ownerId: string;
    freelancerId: string;
}) {
    const { projectId, ownerId, freelancerId } = data;
    if (!projectId || !ownerId || !freelancerId) {
        return {
            status: "error",
            message: "Invalid data provided",
        };
    }
    try {
        await api<{ id: string }>(
            `/project/freelancer/${freelancerId}?action=unassign`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ownerId,
                    projectId,
                }),
            }
        );
        revalidatePath("/");
    } catch (error) {
        return {
            status: "error",
            message: "Erro ao remover o freelancer do projeto.",
            error,
        };
    }
}
