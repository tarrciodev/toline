"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

export async function removeSpecialization({
    tolinerId,
    specializationId,
}: {
    tolinerId: string;
    specializationId: string;
}) {
    const response = await api<{ id: string }>(
        `/toliner/${tolinerId}/specialization/${specializationId}/remove`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        }
    );

    if (response.id) {
        revalidatePath("/");
        return {
            status: "success",
            message: "Especialização removida com sucesso",
        };
    }

    return {
        status: "error",
        message: "Erro ao remover especialização",
        response,
    };
}
