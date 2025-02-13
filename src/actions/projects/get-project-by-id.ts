"use server";

import { prisma } from "@/config/prisma";
import { ProjectFullProps } from "../users/get-entity";

export async function getProjectById(
    id: string
): Promise<{ status: string; message: string; project?: ProjectFullProps }> {
    const project = await prisma.project.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            freelancerId: true,
            dueDate: true,
            subcategoryId: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                },
            },
            skills: true,
            category: {
                select: {
                    id: true,
                    name: true,
                    subcategories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    skills: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
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
            payment: {
                select: {
                    id: true,
                    ammount: true,
                    createdAt: true,
                    clientInvoce: true,
                    systemInvoce: true,
                    verifiedFromSystem: true,
                },
            },
            quotation: {
                select: {
                    id: true,
                    ammount: true,
                    description: true,
                },
            },
        },
    });

    if (!project) {
        return {
            status: "error",
            message: "Project not found",
        };
    }

    const parsedProjects = {
        id: project.id as string,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt.toLocaleDateString(),
        dueDate: project.dueDate?.toLocaleDateString() as string,
        updatedAt: project.updatedAt.toLocaleDateString(),
        category: project.category?.name as string,
        freelancerId: project.freelancerId as string,
        subcategory: project.category?.subcategories?.find(
            (subcategory) => subcategory.id === project.subcategoryId
        )?.name as string,
        skills: project.skills?.map((skill) => {
            return {
                id: skill,
                name: project.category?.skills?.find(
                    (categoryskill) => categoryskill.id === skill
                )?.name as string,
            };
        }),
        owner: {
            id: project.owner?.id as string,
            name: project.owner?.name as string,
        },

        subscriptions: project.subscriptions?.map((subscription) => ({
            id: subscription.id,
            freelancer: {
                id: subscription.freelancer.id,
                name: subscription.freelancer.name,
                avatarUrl: subscription.freelancer.avatarUrl as string,
            },
            createdAt: subscription.createdAt.toLocaleDateString(),
        })),
        payment: {
            id: project.payment?.id as string,
            ammount: project.payment?.ammount as number,
            createdAt:
                project.payment?.createdAt.toLocaleDateString() as string,
            clientInvoce: project.payment?.clientInvoce as string,
            systemInvoce: project.payment?.systemInvoce as string,
            verifiedFromSystem: project.payment?.verifiedFromSystem as boolean,
        },
        quotation: {
            id: project.quotation?.id as string,
            ammount: project.quotation?.ammount as number,
            description: project.quotation?.description as string,
        },
    };

    return {
        status: "success",
        message: "Project found",
        project: parsedProjects,
    };
}
