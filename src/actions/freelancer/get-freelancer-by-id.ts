"use server";

import { api } from "@/config/api";
import { EntityProps } from "@/store/entity";

export async function getFreelancerById(
    freelancerId: string
): Promise<EntityProps> {
    const freelancer = api<EntityProps>(`/freelancer/${freelancerId}`);
    return freelancer;
}
