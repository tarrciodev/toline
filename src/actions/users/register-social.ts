"use server";

import { auth } from "@/auth";
import { api } from "@/config/api";

export async function registerSocial(
    type: "client" | "freelancer"
): Promise<{ status: "success" | "error"; message: string }> {
    const { user } = (await auth()) as {
        user: { email: string; name: string; image: string };
    };

    const userCreated = await api<{ email: string; password: string }>(
        "/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                name: user.name,
                avatarUrl: user?.image,
                type,
            }),
        }
    );

    if (!userCreated.email) {
        return { status: "error", message: "Erro ao criar o usuário" };
    }

    return { status: "success", message: "usuario criado com sucesso" };
}
