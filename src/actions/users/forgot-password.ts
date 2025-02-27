"use server";

import { api } from "@/config/api";
import { resend } from "@/config/resend";

export async function forgotPassword(
    _: unknown,
    formData: FormData
): Promise<{ status: "success" | "error"; message: string }> {
    const email = formData.get("email") as string;

    const token = await api(`/user/forgot-password/${email}`);

    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Hello world",
        text: `${process.env.SITE_URL as string}/reset-password/${token}?email=${email}`,
    });

    return {
        status: "success",
        message: "Um email foi enviado para seu email",
    };
}
