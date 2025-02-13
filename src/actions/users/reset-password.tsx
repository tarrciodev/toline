"use server";

import { prisma } from "@/config/prisma";
import { isAutdated } from "@/utils/is-outdated";
import { hashSync } from "bcrypt";

export async function resetPassword(data: {
    password: string;
    confirmPassword: string;
    token: string;
}) {
    const userReset = {
        password: data.password,
        confirmPassword: data.confirmPassword,
    };

    console.log(userReset);

    const tokenIsValide = await prisma.passwordResets.findFirst({
        where: {
            token: data.token,
        },
    });

    if (!tokenIsValide) {
        return {
            status: "error",
            message: "Token inválido",
        };
    }

    const tokenHasExpired = isAutdated(tokenIsValide.expires);

    if (tokenHasExpired) {
        await prisma.passwordResets.delete({
            where: {
                id: tokenIsValide.id,
            },
        });

        return {
            status: "error",
            message: "O Token expirou",
        };
    }

    await prisma.user.update({
        where: {
            email: tokenIsValide.userEmail,
        },
        data: {
            password: hashSync(userReset.password, 8),
        },
    });

    await prisma.passwordResets.delete({
        where: {
            id: tokenIsValide.id,
        },
    });

    return {
        status: "success",
        message: "Password resetado com sucesso. Vá para a pagina de login",
    };
}
