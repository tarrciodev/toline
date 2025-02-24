"use server";

import { auth } from "@/auth";
import { api } from "@/config/api";

export async function loginWithAuthProvider(): Promise<{
    status: "success" | "error";
    message: string;
}> {
    const { user } = (await auth()) as {
        user: { email: string; name: string };
    };
    const userExists = await api<{ email: string; name: string }>(
        "/auth/social",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
            }),
        }
    );

    if (!userExists.email) {
        return {
            status: "error",
            message: "Nenhum usuario foi encontrado",
        };
    }

    return {
        status: "success",
        message: "Usuário logado com sucesso",
    };
}
