"use server";
import { auth } from "@/auth";
import { prisma } from "@/config/prisma";

export async function getUser(): Promise<{
    id: string;
    type: string;
    email: string;
    userId: string;
    username: string;
    avatarUrl?: string;
    tag: string;
}> {
    const {
        user: { email },
    } = (await auth()) as { user: { email: string } };
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    const parseUser = {
        id: user?.id as string,
        type: user?.type as string,
        email: user?.email as string,
        userId: user?.userId as string,
        username: user?.username as string,
        avatarUrl: user?.avatarUrl as string,
        tag: user?.tag as string,
    };

    return parseUser;
}
