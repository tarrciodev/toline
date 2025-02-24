"use server";

import { api } from "@/config/api";
import { IProject } from "./get-projects";

export async function getProjectsBySubscription(
    subscriptions: string[]
): Promise<IProject[]> {
    const projects = await api<IProject[]>("/projects/by-subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            subscriptions,
        }),
    });
    console.log({ projects });
    return projects;
}
