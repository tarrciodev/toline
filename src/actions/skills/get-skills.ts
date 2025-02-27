"use server";

import { api } from "@/config/api";

export type Skills = {
    id: string;
    name: string;
};

export async function getSkills(): Promise<Skills[]> {
    const skills = await api<Skills[]>("/skills");

    return skills;
}
