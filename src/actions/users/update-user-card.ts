"use server";

import { api } from "@/config/api";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";
import { getMe } from "./get-me";

type UpdateUserCardProps = {
    username: string;
    avatar?: File | undefined;
    jobDescription?: string;
};
export async function updateUserCard(
    data: UpdateUserCardProps
): Promise<{ status: "error" | "success"; message: string }> {
    let avatarUrl: string | null = null;

    if (data.avatar) {
        avatarUrl = ((await supabaseUpload(data.avatar)) as string) ?? null;
    }

    const me = await getMe();

    const updatedUser = await api<{ id: string }>(
        `/user/${me?.id}/update-card`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                avatarUrl,
                jobDescription: data.jobDescription,
            }),
        }
    );

    if (!updatedUser.id) {
        return {
            status: "error",
            message: "Ocorreu um erro. tente outra vez",
        };
    }

    revalidatePath("/");

    return {
        status: "success",
        message: "Perfil Atualizado com Sucesso",
    };
}
