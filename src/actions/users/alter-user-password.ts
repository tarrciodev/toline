import { api } from "@/config/api";
import { getMe } from "./get-me";

interface IAlterUserPassword {
    password: string;
    oldPassword?: string;
}
export async function alterUserPassword({
    password,
    oldPassword,
}: IAlterUserPassword) {
    const me = await getMe();
    const response = await api<{
        status: "error" | "success";
        message: string;
    }>(`/user/alter-password/${me.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            oldPassword,
        }),
    });

    if (response.status === "error") {
        return {
            status: "error",
            message: response.message,
        };
    }

    return {
        status: "success",
        message: "Senha alterada com sucesso",
    };
}
