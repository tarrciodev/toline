"use server";

import { api } from "@/config/api";
import { IProject } from "./get-projects";

export async function getProjectsOfInterest(
    userEmail: string
): Promise<IProject[]> {
    const projects = await api<IProject[]>(
        `/projects/of-interest/${userEmail}`
    );
    const parsedProjects = projects?.map((project) => {
        return {
            ...project,
            createdAt: new Date(project.createdAt).toLocaleDateString(),
        };
    });
    return parsedProjects;
}
