"use server";

import { prisma } from "@/config/prisma";
import { generateSlug } from "@/utils/generate-slug";

interface ICreateCategoryProps {
    name: string;
    description?: string;
}
export async function createCategory(
    category: ICreateCategoryProps
): Promise<{ status: "created" | "rejected"; message: string }> {
    const categoryExists = await prisma.category.findUnique({
        where: {
            name: category.name,
        },
    });

    if (categoryExists)
        return { status: "rejected", message: "Category already exists" };

    const newCategory = await prisma.category.create({
        data: {
            slug: generateSlug(category.name),
            name: category.name,
            description: category.description,
        },
    });

    if (!newCategory)
        return { status: "rejected", message: "Erro ao criar categoria" };

    return {
        status: "created",
        message: "Categoria criada com sucesso",
    };
}
