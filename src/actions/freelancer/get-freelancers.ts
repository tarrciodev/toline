"use server";

import { api } from "@/config/api";

export type FreelancersProps = {
    id: string;
    name: string;
    avatarUrl: string;
    createdAt: string;
    bio: string;
    skills: Array<{
        id: string;
        name: string;
    }>;
    especialization: Array<{
        id: string;
        name: string;
    }>;
};

interface IGetFreelancers {
    freelancers: FreelancersProps[];
    totalPages: number;
}

export async function getFreelancers({
    specialization,
    skills,
}: {
    specialization: string | undefined;
    skills: string;
}): Promise<IGetFreelancers> {
    const data = await api<IGetFreelancers>(
        `/freelancers?skills=${skills}&specialization=${specialization}`
    );

    return {
        freelancers: data.freelancers,
        totalPages: data.totalPages,
    };
}
