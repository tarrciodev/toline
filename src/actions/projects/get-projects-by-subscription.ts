"use server";

import { prisma } from "@/config/prisma";
import { IProject } from "./get-projects";

export async function getProjectsBySubscription(
    subscriptions: string[]
): Promise<IProject[]> {
    const projects = await prisma.project.findMany({
        where: {
            subscriptions: {
                some: {
                    id: {
                        in: subscriptions,
                    },
                },
            },
        },
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            status: true,
            subcategoryId: true,
            subscriptions: {
                select: {
                    id: true,
                    freelancer: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true,
                        },
                    },
                    createdAt: true,
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    skills: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                    subcategories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            owner: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        cacheStrategy: { ttl: 60 },
    });

    const parsedProjects = projects.map(async (project) => {
        return {
            ...project,
            createdAt: project.createdAt.toLocaleDateString(),
            category: project.category?.name as string,
            subcategory: project.category?.subcategories?.find(
                (subcategory) => subcategory.id === project.subcategoryId
            )?.name as string,
            subscriptions: project.subscriptions?.map((subscription) => ({
                ...subscription,
                createdAt: subscription.createdAt.toLocaleDateString(),
            })),
        };
    });

    const refinedProjects = await Promise.all(parsedProjects);

    return refinedProjects as IProject[];
}
