"use server";

import { api } from "@/config/api";

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
    const categories = await api<Icategories[]>("/categories");
    return categories;
}
