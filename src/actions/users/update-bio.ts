"use server";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import { getUserAsEntity } from "./get-entity";

export async function updateUserBio(_: unknown, formData: FormData) {
    const bio = formData.get("bio") as string;
    if (!bio) {
        return {
            status: "error",
            message: "O campo bio é obrigatório",
        };
    }
    const response = await getUserAsEntity();
    if (response.status === "error") {
        return {
            status: "error",
            message: "Não foi possível atualizar a Bio",
        };
    }
    const entity = response.data;
    if (entity?.type == "freelancer") {
        await prisma.freelancer.update({
            where: {
                id: entity.id,
            },
            data: {
                bio,
            },
        });

        revalidatePath("/");

        return {
            status: "success",
            message: "A bio foi atualizada com sucesso!",
        };
    }

    await prisma.client.update({
        where: {
            id: entity?.id as string,
        },
        data: {
            bio,
        },
    });

    revalidatePath("/");

    return {
        status: "success",
        message: "A bio foi atualizada com sucesso",
    };
}
