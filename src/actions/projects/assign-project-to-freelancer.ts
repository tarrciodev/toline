"use server";

import { prisma } from "@/config/prisma";

export async function assignProjectToFreelancer(
    projectId: string,
    freelancerId: string,
    ownerId: string
): Promise<{ status: "asigned" | "rejected"; message: string }> {
    if (!projectId || !freelancerId || !ownerId) {
        return {
            status: "rejected",
            message: "Sem informações suficientes",
        };
    }

    const isOwner = await prisma.project.findFirst({
        where: {
            ownerId,
        },
    });

    if (!isOwner) {
        return {
            status: "rejected",
            message: "Você não é o dono do projeto",
        };
    }

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            freelancerId,
        },
    });

    return {
        status: "asigned",
        message: "Projeto atualizado com sucesso",
    };
}
