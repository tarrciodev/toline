"use server";

import { api } from "@/config/api";
import { loginWithCredentials } from "./login-with-credentials";

export async function resetPassword(data: {
    password: string;
    confirmPassword: string;
    code: string;
    email: string;
}) {
    const userReset = {
        password: data.password,
        code: data.code,
    };

    const response = await api<{
        status: "error" | "success";
        message: string;
    }>(`/user/reset-password/${data.email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userReset),
    });

    if (response.status === "error") {
        return {
            status: "error",
            message: response.message,
        };
    }

    await loginWithCredentials({
        email: data.email,
        password: userReset.password,
    });

    return {
        status: "success",
        message: "Password resetado com sucesso. Vá para a pagina de login",
    };
}
