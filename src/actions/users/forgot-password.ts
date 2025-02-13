"use server";

import { prisma } from "@/config/prisma";
import { resend } from "@/config/resend";
import { generateToken } from "@/utils/generate-cripto-token";

export async function forgotPassword(
    _: unknown,
    formData: FormData
): Promise<{ status: "success" | "error"; message: string }> {
    const email = formData.get("email") as string;
    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!userExists) {
        return {
            status: "error",
            message: "Nenhum usuário foi encontrado",
        };
    }

    const token = generateToken(20);

    const canNotCreateNewToken = await prisma.passwordResets.findUnique({
        where: {
            userEmail: email,
        },
    });

    if (canNotCreateNewToken) {
        return {
            status: "error",
            message:
                "Vc já solicitou um reset. Aguarde 10 minutos para fazer o proximo",
        };
    }

    await prisma.passwordResets.create({
        data: {
            userEmail: email,
            token: token,
            expires: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
        },
    });

    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "Hello world",
        text: `${process.env.SITE_URL as string}/reset-password/${token}`,
    });

    return {
        status: "success",
        message: "Um email foi enviado para seu email",
    };
}
