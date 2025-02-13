"use server";

import { prisma } from "@/config/prisma";
import { generateSlug } from "@/utils/generate-slug";

interface ICreateSubcategoryProps {
    name: string;
    description?: string;
    categoryId: string;
}
export async function createSubcategory(
    subcategory: ICreateSubcategoryProps
): Promise<{
    status: "created" | "rejected";
    message: string;
}> {
    const categoryExists = await prisma.category.findUnique({
        where: {
            name: subcategory.name,
        },
    });

    if (categoryExists)
        return { status: "rejected", message: "Essa subcategoria já existe" };

    const newSubcategory = await prisma.subcategory.create({
        data: {
            name: subcategory.name,
            slug: generateSlug(subcategory.name),
            description: subcategory.description,
            categoryId: subcategory.categoryId,
        },
    });

    if (!newSubcategory)
        return { status: "rejected", message: "Erro ao criar subcategoria" };
    return {
        status: "created",
        message: "Subcategoria criada com sucesso",
    };
}
