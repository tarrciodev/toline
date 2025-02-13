import { auth } from "@/auth";
import { prisma } from "@/config/prisma";
import React from "react";

export async function Can({
    who,
    children,
}: {
    who: "client" | "freelancer";
    children: React.ReactNode;
}) {
    const { user } = (await auth()) as {
        user: { email: string; name: string };
    };

    const entity = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    const isAuthorized = who === entity!.type!;

    if (!isAuthorized) {
        return <></>;
    }

    return children;
}
