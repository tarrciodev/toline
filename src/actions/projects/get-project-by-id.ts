"use server";

import { api } from "@/config/api";
import { ProjectFullProps } from "@/store/entity";

export async function getProjectById(id: string): Promise<ProjectFullProps> {
    const project = await api<ProjectFullProps>(`/project/${id}`);
    return project;
}
