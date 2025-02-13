"use server";
import { prisma } from "@/config/prisma";
import { EntityProps } from "../users/get-entity";
type ClientByEmail = {
    status: "error" | "success";
    message: string;
    data?: EntityProps;
};
export async function getClientByEmail(email: string): Promise<ClientByEmail> {
    const client = await prisma.client.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            createdAt: true,
            projects: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    dueDate: true,
                    concludedAt: true,
                    subcategoryId: true,
                    skills: true,
                    freelancerId: true,
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
            },
        },
    });

    if (!client) {
        return {
            status: "error",
            message: "Client not found",
        };
    }

    const parseClient = {
        ...client,
        bio: client.bio as string,
        createdAt: new Date(client.createdAt).toLocaleDateString(),
        projects: client.projects.map((project) => {
            return {
                id: project.id,
                name: project.name,
                description: project.description,
                status: project.status,
                createdAt: project.createdAt.toLocaleDateString(),
                updatedAt: project.updatedAt.toLocaleDateString(),
                dueDate: project.dueDate?.toLocaleDateString(),
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
                payment: {
                    id: project.payment?.id as string,
                    ammount: project.payment?.ammount as number,
                    createdAt:
                        project.payment?.createdAt.toLocaleDateString() as string,
                    clientInvoce: project.payment?.clientInvoce as string,
                    systemInvoce: project.payment?.systemInvoce as string,
                    verifiedFromSystem: project.payment
                        ?.verifiedFromSystem as boolean,
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
                quotation: {
                    id: project.quotation?.id as string,
                    ammount: project.quotation?.ammount as number,
                    description: project.quotation?.description as string,
                },
            };
        }),
        type: "client",
    };

    return {
        status: "success",
        message: "user found",
        data: parseClient,
    };
}
