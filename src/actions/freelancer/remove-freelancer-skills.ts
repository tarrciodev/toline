"use server";

import { ISkills } from "@/components/profile/skills-list";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";

export async function removeFreelancerSkills(
    freelancerId: string,
    skills: ISkills[]
) {
    const parseSkills = skills.map((skill) => {
        return {
            id: skill.id,
        };
    });

    console.log({
        parseSkills,
        freelancerId,
    });

    const remove = await prisma.freelancer.update({
        where: {
            id: freelancerId,
        },
        data: {
            skills: {
                disconnect: parseSkills,
            },
        },
    });

    revalidatePath("/");
    return remove;
}
