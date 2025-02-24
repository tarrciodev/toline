"use server";

import { signIn } from "@/auth";
import { registerWithCredentialProps } from "@/components/forms/register-with-credentials";
import { aj } from "@/config/aj";
import { api } from "@/config/api";
import z, { ZodError } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
});

export async function registerWithCredentials(
    data: registerWithCredentialProps,
    userType: string
): Promise<{
    status: "success" | "error";
    message: string;
    error?: ZodError<{ name: string; email: string; password: string }>;
} | null> {
    const user = {
        email: data.email,
        name: data.name,
        password: data.password,
    };

    const validateSchema = schema.safeParse(user);
    if (!validateSchema.success) {
        return {
            status: "error",
            message: "Ocoreu un erro",
            error: validateSchema.error,
        }; // Return an object with an error property
    }

    const { email } = user;

    const validateEmailDecision = await aj.protect({ headers: {} }, { email });
    if (validateEmailDecision?.isDenied()) {
        return { status: "error", message: "Email bloqueado" };
    }

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
                password: user.password,
                type: userType,
            }),
        }
    );

    if (!userCreated.email) {
        return { status: "error", message: "Erro ao criar o usuário" };
    }

    try {
        await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
        });
        return { status: "success", message: "usuario criado com sucesso" };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { status: "error", message: "Erro ao criar o usuário" };
    }
}
