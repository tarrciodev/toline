"use server";

import { prisma } from "@/config/prisma";
import { compareSync } from "bcrypt";
import { z } from "zod";

const loginWithEmailSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(8, "Password deve ter pelo menos 8 caracteres"),
});

export async function loginWithEmail(data: {
    email: string;
    password: string;
}): Promise<{
    status: "success" | "error";
    message: string;
    error?: { email: string; password: string };
}> {
    const user = data;

    const validateSchema = loginWithEmailSchema.safeParse(user);

    if (!validateSchema.success) {
        console.log(validateSchema.error);
        const error = {
            email: validateSchema.error.issues.find((i) => i.path[0] == "email")
                ?.message as string,
            password: validateSchema.error.issues.find(
                (i) => i.path[0] == "password"
            )?.message as string,
        };

        return {
            status: "error",
            message: "Ocoreu um erro",
            error,
        };
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (!userExists) {
        return {
            status: "error",
            message: "Email ou senha incorretos",
        };
    }

    const passwordMatches = compareSync(user.password, userExists.password!);

    if (!passwordMatches) {
        return {
            status: "error",
            message: "Email ou senha incorretos",
        };
    }

    return {
        status: "success",
        message: "Usuário logado com sucesso",
    };
}
