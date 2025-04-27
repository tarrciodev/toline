"use server";
import { api } from "@/config/api";

export type IProject = {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    status: string;
    category: string;
    subcategory?: string;
    owner?: {
        id: string;
        name: string;
    };
    subscriptions?: Array<{
        id: string;
        toliner: {
            id: string;
            name: string;
            avatarUrl?: string;
        };
        createdAt: string;
    }>;
    skills?: Array<{
        id: string;
        name: string;
    }>;
};

export async function getProjects(
    slug = "",
    page = "1"
): Promise<{ projects: IProject[]; totalItems: number }> {
    const data = await api<{ projects: IProject[]; totalItems: number }>(
        `/projects?page=${page}&take=8&slug=${slug}`
    );
    const parsedProjects = data.projects.map((project) => {
        return {
            ...project,
            createdAt: new Date(project.createdAt).toLocaleDateString(),
        };
    });

    const totalItems = data.totalItems;

    return {
        projects: parsedProjects,
        totalItems,
    };
}
