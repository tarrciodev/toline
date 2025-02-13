"use server";

import { prisma } from "@/config/prisma";
import { generateSlug } from "@/utils/generate-slug";

interface ICreateSkillProps {
    name: string;
    description: string;
    categoryId: string;
    subcategoryId?: string;
}
export async function createSkill(
    skill: ICreateSkillProps
): Promise<{ status: "created" | "rejected"; message: string }> {
    const skillExists = await prisma.skill.findUnique({
        where: {
            subcategoryId_categoryId_name: {
                subcategoryId: skill.subcategoryId ?? "",
                categoryId: skill.categoryId,
                name: skill.name,
            },
        },
    });

    if (skillExists)
        return { status: "rejected", message: "Essa skill já existe" };

    const newSkill = await prisma.skill.create({
        data: {
            name: skill.name,
            slug: generateSlug(skill.name),
            description: skill.description,
            categoryId: skill.categoryId,
            subcategoryId: skill.subcategoryId,
        },
    });

    if (!newSkill)
        return { status: "rejected", message: "Erro ao criar skill" };

    return {
        status: "created",
        message: "Skill criada com sucesso",
    };
}
