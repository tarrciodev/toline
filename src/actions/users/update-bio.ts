"use server";
import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

export async function updateUserBio(_: unknown, formData: FormData) {
    const bio = formData.get("bio") as string;
    const userId = formData.get("userId") as string;
    if (!bio) {
        return {
            status: "error",
            message: "O campo bio é obrigatório",
        };
    }

    const data = await api<{ id: string }>(`/user/${userId}/bio/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bio,
        }),
    });

    if (!data.id) {
        return {
            status: "error",
            message: "Ocorreu um erro ao atualizar o seu bio",
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Bio atualizado com sucesso",
    };
}
