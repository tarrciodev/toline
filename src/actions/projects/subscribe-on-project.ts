"use server";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

type DataProps = {
    quotation: number;
    justification: string;
    estimatedTime: string;
    information: string;
    similarExperiences: string;
};

type DependenciesProps = {
    projectId: string;
    freelancerId: string;
};

export async function subscribeOnProject(
    data: DataProps,
    dependencies: DependenciesProps
): Promise<{ status: "Created" | "rejected"; message: string }> {
    const { projectId, freelancerId } = dependencies;
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

    if (subscriptionExists) {
        return {
            status: "rejected",
            message: "Você ja se inscreveu nesse projeto",
        };
    }

    await prisma.projectSubscription.create({
        data: {
            projectId,
            freelancerId,
            quotation: data.quotation,
            justificationText: data.justification,
            estimatedTime: data.estimatedTime,
            requiredInformations: data.information,
            similarExperiences: data.similarExperiences,
        },
    });

    revalidatePath("/");

    return {
        status: "Created",
        message: "Você se inscreveu nesse projeto",
    };
}
