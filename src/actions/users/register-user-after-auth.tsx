"use server";

import { auth } from "@/auth";
import { prisma } from "@/config/prisma";
import { generateTagFromEmail } from "@/utils/generate-tag-from-email";

export async function registerUserAfterAuth(
    type: "client" | "freelancer"
): Promise<{ status: "success" | "error"; message: string }> {
    const { user } = (await auth()) as {
        user: { email: string; name: string };
    };
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (userExists) {
        return {
            status: "error",
            message: "User already exists",
        };
    }

    const isFreelancer = type === "freelancer";

    const entity = isFreelancer
        ? await prisma.freelancer.create({
              data: {
                  name: user.name,
                  email: user.email,
              },
          })
        : await prisma.client.create({
              data: {
                  name: user.name,
                  email: user.email,
              },
          });

    await prisma.user.create({
        data: {
            userId: entity.id,
            email: entity.email,
            tag: generateTagFromEmail(entity.email),
            username: entity.name,
            avatarUrl: entity.avatarUrl,
            type,
        },
    });

    return {
        status: "success",
        message: "User created successfully",
    };
}
