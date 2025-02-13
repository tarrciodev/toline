"use server";

import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

type UpdateSkills = {
    freelancerId: string;
    skills: string[];
    userSkills: Array<{
        id: string;
        name: string;
        categoryId: string;
        subcategoryId?: string;
        tag?: string;
    }>;
};

export async function updateFreelancerSkills({
    freelancerId,
    skills,
    userSkills,
}: UpdateSkills) {
    if (!freelancerId) {
        return;
    }

    const filterSkills = skills.filter(
        (skill) => !userSkills.find((user) => user.name === skill)
    );
    const parseUserSkills = userSkills.map((skill) => {
        return {
            id: skill.id,
        };
    });

    const lookForSkills = await prisma.skill.findMany({
        where: {
            name: {
                in: filterSkills,
            },
        },
        select: {
            id: true,
        },
    });
    const newSkills = [...parseUserSkills, ...lookForSkills];

    console.log(newSkills);

    const freelancer = await prisma.freelancer.update({
        where: {
            id: freelancerId,
        },
        data: {
            skills: {
                connect: newSkills,
            },
        },
    });

    revalidatePath(`/`);

    return freelancer;
}
