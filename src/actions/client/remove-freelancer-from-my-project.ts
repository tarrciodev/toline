/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

export async function removeFreelancerFromMyProject(data: {
    projectId: string;
    entityId: string;
    freelancerId: string;
}) {
    const isAuthorized = await prisma.project.findFirst({
        where: { id: data.projectId, ownerId: data.entityId },
    });

    if (!isAuthorized) {
        return {
            status: "error",
            message: "Operação não autorizada.",
        };
    }

    try {
        await prisma.project.update({
            where: { id: data.projectId },
            data: {
                freelancer: {
                    disconnect: {
                        id: data.freelancerId,
                    },
                },
            },
        });

        revalidatePath("/");
    } catch (error) {
        return {
            status: "error",
            message: "Erro ao remover o freelancer do projeto.",
        };
    }
}
