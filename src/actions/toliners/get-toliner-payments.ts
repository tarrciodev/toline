"use server";

import { api } from "@/config/api";
import { getCookieStore } from "@/utils/cookie-store";

export type FreelancerPayments = {
    id: string;
    ammount: number;
    createdAt: string; // ou Date, dependendo do uso
    status: "pending" | "approved" | "rejected" | string;
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

export async function getTolinerPayments(
    entityId: string
): Promise<FreelancerPayments[]> {
    const logged_as = await getCookieStore("logged_as");
    const payments = await api<FreelancerPayments[]>(
        `/${logged_as}/${entityId}/payments`
    );
    return payments;
}
