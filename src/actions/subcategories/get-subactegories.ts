"use server";

import { prisma } from "@/config/prisma";

export async function getSubcategories() {
    const subcategories = await prisma.subcategory.findMany();
    return subcategories;
}
