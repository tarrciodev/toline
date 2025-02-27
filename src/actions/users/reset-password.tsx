"use server";

import { api } from "@/config/api";

export async function resetPassword(data: {
    password: string;
    confirmPassword: string;
    token: string;
    email: string;
}) {
    const userReset = {
        password: data.password,
        token: data.token,
    };

    const response = await api(`/user/reset-password/${data.email}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userReset),
    });

    if (!response) {
        return {
            status: "error",
            message: "Falha ao resetar a password",
        };
    }

    return {
        status: "success",
        message: "Password resetado com sucesso. Vá para a pagina de login",
    };
}
