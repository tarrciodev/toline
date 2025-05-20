"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";
import { getCategories } from "../categories/get-categories";

type UpdateSpecializations = {
    tolinerId: string;
    specializations: string[];
};

export async function addSpecializations({
    tolinerId,
    specializations,
}: UpdateSpecializations): Promise<{
    status: "error" | "success";
    message: string;
}> {
    const categories = await getCategories();
    const newSpecializations = categories
        .filter((category) => specializations.includes(category.name))
        .map((category) => category.id);

    const toliner = await api<{ id: string }>(
        `/toliner/${tolinerId}/specializations/add`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                specializations: newSpecializations,
            }),
        }
    );

    if (!toliner.id) {
        return {
            status: "error",
            message: "Erro ao atualizar especializações",
        };
    }

    revalidatePath(`/`);

    return {
        status: "success",
        message: "Especializações atualizadas com sucesso",
    };
}
