"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
    ownerId: z.string().min(1),
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

    const { ownerId, projectId, freelancerId } = safeData.data;

    const project = await api<{ id: string }>(
        `/project/freelancer/${freelancerId}?action=assign`,
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

    if (!project.id) {
        return {
            status: "error",
            message: "Ocorreu um erro ao aceitar o freelancer no projeto",
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Freelancer hired successfully",
    };
}
