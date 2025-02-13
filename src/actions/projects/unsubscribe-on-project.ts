"use server";

import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

export async function unsubscribeOnProject(
    projectId: string,
    freelancerId: string
): Promise<{ status: "success" | "rejected"; message: string }> {
    if (!projectId || !freelancerId) {
        return {
            status: "rejected",
            message: "Sem informações suficientes para criar esta subscrição",
        };
    }

    const subscriptionExists = await prisma.projectSubscription.findUnique({
        where: {
            projectId_freelancerId: {
                projectId,
                freelancerId,
            },
        },
    });

    if (!subscriptionExists) {
        return {
            status: "rejected",
            message: "Você ja não se inscreveu nesse projeto",
        };
    }

    await prisma.projectSubscription.delete({
        where: {
            projectId_freelancerId: {
                projectId,
                freelancerId,
            },
        },
    });

    revalidatePath("/");

    return {
        status: "success",
        message: "Subscrição anulada com sucesso",
    };
}
