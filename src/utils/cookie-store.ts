"use server";

import { cookies } from "next/headers";

export async function getCookieStore(key: string) {
    const cookieStore = await cookies();
    const value = cookieStore.get(key)?.value;
    return value;
}
