"use server";

import { api } from "@/config/api";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";

export async function updateFreelancerIdentification({
    BIFront,
    BIBack,
    userId,
}: {
    BIFront: File | null;
    BIBack: File | null;
    userId: string;
}): Promise<{ status: "error" | "success"; message: string }> {
    const [frontUrl, backUrl] = await Promise.all([
        supabaseUpload(BIFront!),
        supabaseUpload(BIBack!),
    ]);

    if (!BIFront || !BIBack) {
        return {
            status: "error",
            message:
                "Erro ao fazer o upload. cada imagem deve ter no máximo 1MB",
        };
    }

    const response = await api<{ id: string }>(
        `/user/${userId}/identification/update`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                frontUrl,
                backUrl,
            }),
        }
    );

    if (response.id) {
        revalidatePath("/");

        return {
            status: "success",
            message: "Identificação atualizada com sucesso",
        };
    }

    return {
        status: "error",
        message: "Erro ao atualizar a identificação",
    };
}
