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

export async function getFreelancers(
    especialization: string | undefined,
    skills: string
): Promise<FreelancersProps[]> {
    const freelancers = await api<FreelancersProps[]>(`/freelancers`);

    console.log({ especialization, skills });

    return freelancers;
}
