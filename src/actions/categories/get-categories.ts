"use server";

import { prisma } from "@/config/prisma";

export type ICategorySkills = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    categoryId: string | null;
    subcategoryId: string | null;
};

export type Icategories = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    skills: ICategorySkills[];
    subcategories: {
        id: string;
        name: string;
    }[];
};

export async function getCategories(): Promise<Icategories[]> {
    const categories = await prisma.category.findMany({
        include: {
            subcategories: {
                select: {
                    id: true,
                    name: true,
                },
            },
            skills: {
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    description: true,
                    categoryId: true,
                    subcategoryId: true,
                },
            },
        },
    });
    console.log({ categories });
    return categories;
}
