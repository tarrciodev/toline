"use server";

import { api } from "@/config/api";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";
import { getMe } from "./get-me";

type UpdateUserCardProps = {
    username: string;
    avatar?: File | undefined;
};
export async function updateUserCard(data: UpdateUserCardProps) {
    let avatarUrl: string | null = null;

    if (data.avatar) {
        avatarUrl = ((await supabaseUpload(data.avatar)) as string) ?? null;
    }

    const me = await getMe();

    const updateUser = await api(`/user/${me?.id}/update-card`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: data.username,
            avatarUrl,
        }),
    });

    revalidatePath("/");

    return updateUser;
}
