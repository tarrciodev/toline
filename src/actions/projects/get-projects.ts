import { prisma } from "@/config/prisma";

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
        freelancer: {
            id: string;
            name: string;
            avatarUrl?: string;
        };
        createdAt: string;
    }>;
};

export async function getProjects(slug?: string): Promise<IProject[]> {
    const projects = await prisma.project.findMany({
        where: {
            category: {
                slug: {
                    contains: slug,
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
                            slug: true,
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
