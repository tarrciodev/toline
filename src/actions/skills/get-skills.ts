"use server";

import { prisma } from "@/config/prisma";

export type Skills = {
    id: string;
    name: string;
};

export async function getSkills(): Promise<Skills[]> {
    const skills = await prisma.skill.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return skills;
}
