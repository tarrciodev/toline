"use server";

import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
    entityId: z.string().min(1),
    projectId: z.string().min(1),
    freelancerId: z.string().min(1),
});

type HireFreelancerProps = z.infer<typeof schema>;

export async function hireFreelancerOnMyProject(data: HireFreelancerProps) {
    const safeData = schema.safeParse(data);
    if (!safeData.success) {
        return {
            status: "error",
            message: "Invalid data provided",
        };
    }

    const { entityId, projectId, freelancerId } = safeData.data;

    const projectExists = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!projectExists) {
        return {
            status: "error",
            message: "Project not found",
        };
    }

    const hireDetails = await prisma.project.update({
        where: {
            id: projectId,
            ownerId: entityId,
        },
        data: {
            freelancer: {
                connect: { id: freelancerId },
            },
        },
    });

    revalidatePath("/");

    return {
        status: "success",
        message: "Freelancer hired successfully",
        data: hireDetails,
    };
}
