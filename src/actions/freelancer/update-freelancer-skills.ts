"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";

type UpdateSkills = {
    freelancerId: string;
    skills: string[];
    systemSkills: Array<{
        id: string;
        name: string;
    }>;
    userSkills: Array<{
        id: string;
        name: string;
        categoryId: string;
        subcategoryId?: string;
    }>;
    action: "remove" | "add";
};

export async function updateFreelancerSkills({
    freelancerId,
    skills,
    userSkills,
    systemSkills,
    action,
}: UpdateSkills) {
    if (!freelancerId) {
        return;
    }

    let updateSkills: string[] = [];
    if (action === "add") {
        const userOldSkills = userSkills.map((skill) => {
            return skill.id;
        });

        const newSkills = systemSkills
            .filter((skill) => skills?.includes(skill.name))
            .map((skill) => skill.id);
        updateSkills = [...userOldSkills, ...newSkills];
    }

    if (action === "remove") {
        updateSkills = userSkills
            .filter((skill) => skills.includes(skill.name))
            .map((skill) => skill.id);
    }

    const freelancer = await api(
        `/freelancer/${freelancerId}/skills/update?action=${action}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                skills: updateSkills,
            }),
        }
    );

    revalidatePath(`/`);

    return freelancer;
}
