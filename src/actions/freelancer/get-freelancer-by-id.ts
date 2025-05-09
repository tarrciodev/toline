"use server";

import { api } from "@/config/api";

interface Skill {
    id: string;
    name: string;
}

interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    cover: string;
    completedAt: string;
    skills: Skill[];
    assets: string[];
}

interface Project {
    id: string;
    name: string;
    status: "onGoing" | "completed" | "created";
    specialization: Skill[];
}

export interface Freelancer {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    isVerified: boolean;
    jobDescription: string | null;
    nacionality: string | null;
    projectsFreelanced: Project[]; // This could be further defined if needed
    specialization: Skill[];
    portifolio: PortfolioItem[];
    skills: Skill[];
    bio: string | null;
    avatarUrl: string;
    projects: Project[];
}

export async function getFreelancerById(
    freelancerId: string
): Promise<Freelancer | null> {
    const freelancer = api<Freelancer>(`/freelancer/${freelancerId}`);
    return freelancer;
}
