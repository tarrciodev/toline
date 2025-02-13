/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/config/prisma";

export async function addFreelancerEspecialization(
    _: unknown,
    formData: FormData
): Promise<{ status: string; message: string }> {
    const freelancerId = formData.get("freelancerId") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!freelancerId || !categoryId) {
        return {
            status: "error",
            message: "Falha ao adicionar especialização",
        };
    }

    try {
        await prisma.freelancer.update({
            where: {
                id: freelancerId,
            },
            data: {
                especialiazation: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        });

        return {
            status: "success",
            message: "Freelancer especializado com sucesso",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Falha ao adicionar especialização",
        };
    }
}
