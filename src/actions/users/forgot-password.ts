"use server";
import { api } from "@/config/api";

export async function forgotPassword(
    email: string
): Promise<{ status: "success" | "error"; message: string }> {
    const response = await api<{
        status: "error" | "success";
        message: string;
    }>(
        `/user/forgot-password?userEmail=${email}&siteUrl=${process.env.SITE_URL as string}`,
        {
            method: "POST",
        }
    );

    if (response.status === "error") {
        return {
            status: "error",
            message: response.message,
        };
    }

    return {
        status: "success",
        message: "Enviamos uma mensagem para o seu email, por favor verifique",
    };
}
