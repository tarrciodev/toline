"use server";
import { signIn } from "@/auth";
import { z } from "zod";

const loginWithCredentialsSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(8, "Password deve ter pelo menos 8 caracteres"),
});

export async function loginWithCredentials(data: {
    email: string;
    password: string;
}): Promise<{
    status: "success" | "error";
    message: string;
    error?: { email: string; password: string };
} | void> {
    const user = data;

    const validateSchema = loginWithCredentialsSchema.safeParse(user);

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

    try {
        await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
        });
    } catch (e) {
        console.log(e);
        return {
            status: "error",
            message: "Email ou senha invalidos",
        };
    }
}
