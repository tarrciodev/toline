"use server";

import { revalidatePath } from "next/cache";

export async function revalidateOnCliente(path: string) {
    revalidatePath(path);
}
