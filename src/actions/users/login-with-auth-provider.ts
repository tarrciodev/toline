"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma";

export async function loginWithAuthProvider(): Promise<{
    status: "success" | "error";
    message: string;
}> {
    const { user } = (await auth()) as {
        user: { email: string; name: string };
    };
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (!userExists) {
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
