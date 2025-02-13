import { NewProjectNotification } from "@/components/emails/new-project-notification";
import { prisma } from "@/config/prisma";
import { resend } from "@/config/resend";
import { NextResponse } from "next/server";
import React from "react";

export async function POST(request: Request) {
    const req = await request.json();
    const data = req;

    const {
        record: { name, id, description, created_at },
    } = data as {
        record: {
            name: string;
            id: string;
            description: string;
            created_at: string;
        };
    };

    const users = await prisma.user.findMany({
        where: {
            type: "freelancer",
        },
        select: { email: true },
    });

    const emails = users.map((user) => user.email);
    console.log({ emails });

    await resend.emails.send({
        from: "toline-angola <geral@tonile-angola.com>",
        to: emails,
        subject: "Novo projeto",
        react: React.createElement(NewProjectNotification, {
            project: {
                id,
                name,
                description,
                createdAt: created_at,
            },
        }),
    });

    return NextResponse.json({
        status: 200,
        data,
        message: "new user created",
    });
}
