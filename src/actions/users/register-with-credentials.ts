"use server";

import { registerWithCredentialProps } from "@/components/forms/register-with-credentials";
import { aj } from "@/config/aj";
import { prisma } from "@/config/prisma";
import { generateTagFromEmail } from "@/utils/generate-tag-from-email";
import { hashSync } from "bcrypt";
import z, { ZodError } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
});

export async function registerWithCredentials(
    data: registerWithCredentialProps,
    userType: string
): Promise<{
    status: "success" | "error";
    message: string;
    error?: ZodError<{ name: string; email: string; password: string }>;
}> {
    const user = {
        email: data.email,
        name: data.password,
        password: data.name,
    };

    const validateSchema = schema.safeParse(user);
    if (!validateSchema.success) {
        return {
            status: "error",
            message: "Ocoreu un erro",
            error: validateSchema.error,
        }; // Return an object with an error property
    }

    const { email } = user;

    const validateEmailDecision = await aj.protect({ headers: {} }, { email });
    if (validateEmailDecision?.isDenied()) {
        return { status: "error", message: "Email bloqueado" };
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (userExists) {
        return { status: "error", message: "Email já cadastrado" };
    }

    const entity =
        userType == "freelancer"
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
            email: user.email,
            password: hashSync(user.password, 8),
            username: user.name,
            tag: generateTagFromEmail(entity.email),
            type: userType,
        },
    });

    return { status: "success", message: "usuario criado com sucesso" }; // Return an object with a success property
}
