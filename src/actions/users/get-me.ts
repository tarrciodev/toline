"use server";
import { auth } from "@/auth";
import { api } from "@/config/api";

export interface IMe {
    id: string;
    type: string;
    email: string;
    username: string;
    avatarUrl?: string;
    tag: string;
    tolinerId: string;
    hasSettedPassword: boolean;
}

export async function getMe(): Promise<IMe> {
    const {
        user: { email },
    } = (await auth()) as { user: { email: string } };

    const me = await api<IMe>(`/me/${email}`);
    return me;
}
