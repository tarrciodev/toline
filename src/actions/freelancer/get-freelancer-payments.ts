"use server";

import { api } from "@/config/api";

export type FreelancerPayments = {
    id: string;
    ammount: number;
    createdAt: string; // ou Date, dependendo do uso
    status: "pending" | "resolved" | "rejected" | string;
    project: {
        id: string;
        name: string;
    };
    client: {
        id: string;
        name: string;
    };
    freelancer: {
        id: string;
        name: string;
    };
};

export async function getFreelancerPayments(
    freelancerId: string
): Promise<FreelancerPayments[]> {
    const payments = await api<FreelancerPayments[]>(
        `/freelancer/${freelancerId}/payments`
    );
    return payments;
}
