"use server";
import { auth } from "@/auth";
import { api } from "@/config/api";

interface IMe {
    id: string;
    type: string;
    email: string;
    username: string;
    avatarUrl?: string;
    tag: string;
    userId: string;
}

export async function getMe(): Promise<IMe> {
    const {
        user: { email },
    } = (await auth()) as { user: { email: string } };

    const me = await api<IMe>(`/me/${email}`);
    return me;
}
