import { prisma } from "@/config/prisma";
import { categories } from "@/moks/categories";
import { skills } from "@/moks/skills";
import { subcategories } from "@/moks/subcategories";
import { generateSlug } from "@/utils/generate-slug";

export async function createCategories() {
    const parseCategories = categories.map((category) => {
        return {
            ...category,
            slug: generateSlug(category.name),
        };
    });

    const newCategories = await prisma.category.createMany({
        data: parseCategories,
    });
    return newCategories;
}

export async function createSubcategories() {
    const parseSubcategories = subcategories.map((subcategory) => {
        return {
            ...subcategory,
            slug: generateSlug(subcategory.name),
        };
    });
    const newSubcategories = await prisma.subcategory.createMany({
        data: parseSubcategories,
    });
    return newSubcategories;
}

export async function createSkills() {
    const parseSkills = skills.map((skill) => {
        return {
            ...skill,
            slug: generateSlug(skill.name),
        };
    });
    const newSkills = await prisma.skill.createMany({
        data: parseSkills,
    });
    return newSkills;
}
