"use server";

import { cookies } from "next/headers";

export async function getCookieStore(key: string) {
    const cookieStore = await cookies();
    const value = cookieStore.get(key)?.value;
    return value;
}

export async function setCookieStore(key: string, value: string) {
    const cookieStore = await cookies();
    cookieStore.set(key, value);
    return cookieStore.get(key)?.value;
}
