"use server";

import { signIn } from "@/auth";

export async function loginWithProvider(formData: FormData) {
    const provider = formData.get("action") as string;
    const currentUrl = formData.get("currentUrl") as string;

    await signIn(provider, {
        redirectTo: `/${currentUrl}?provider=${provider}`,
    });
}
