"use server";

import { auth } from "@/auth";
import { api } from "@/config/api";
import { EntityProps } from "@/store/entity";

export async function getUserAsEntity(): Promise<EntityProps> {
    const { user } = (await auth()) as { user: { email: string } };
    const entity = await api<EntityProps>(`/user/entity/${user.email}`);
    return entity;
}
