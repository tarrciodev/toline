"use server";

import { prisma } from "@/config/prisma";
import { EntityProps } from "../users/get-entity";

type FreelancerById = {
    status: "error" | "success";
    message: string;
    data?: EntityProps;
};

export async function getFreelancerById(id: string): Promise<FreelancerById> {
    const freelancer = await prisma.freelancer.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            bio: true,
            isVerified: true,
            projects: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
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
            },
            certifications: {
                select: {
                    id: true,
                    certificationName: true,
                    link: true,
                },
            },
            skills: {
                select: {
                    id: true,
                    name: true,
                    categoryId: true,
                    subcategoryId: true,
                    slug: true,
                },
            },
            identification: {
                select: {
                    id: true,
                    front: true,
                    back: true,
                },
            },
            subscripions: {
                select: {
                    id: true,
                    project: {
                        select: {
                            status: true,
                        },
                    },
                },
            },
        },
    });

    if (!freelancer) {
        return {
            status: "error",
            message: "Freelancer not found",
        };
    }

    const parseFreelancer: EntityProps = {
        id: freelancer.id,
        name: freelancer.name,
        email: freelancer.email,
        bio: freelancer.bio ?? "",
        isVerified: freelancer.isVerified,
        createdAt: freelancer.createdAt.toLocaleDateString(),
        projects: freelancer.projects?.map((project) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            createdAt: project.createdAt.toLocaleDateString(),
            dueDate: project.dueDate?.toLocaleDateString(),
            updatedAt: project.updatedAt.toLocaleDateString(),
            category: project.category?.name as string,
            freelancerId: freelancer.id as string,
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
                verifiedFromSystem: project.payment
                    ?.verifiedFromSystem as boolean,
            },
            quotation: {
                id: project.quotation?.id as string,
                ammount: project.quotation?.ammount as number,
                description: project.quotation?.description as string,
            },
        })),
        certifications: freelancer.certifications?.map((certification) => ({
            id: certification.id,
            certificationName: certification.certificationName,
            link: certification.link,
        })),
        skills: freelancer.skills?.map((skill) => ({
            id: skill.id,
            name: skill.name,
            categoryId: skill.categoryId as string,
            subcategoryId: skill?.subcategoryId as string,
            slug: skill?.slug as string,
        })),
        subscriptions: freelancer.subscripions?.map((subscription) => ({
            id: subscription.id,
            project: {
                status: subscription.project.status,
            },
        })),
        identification: {
            id: freelancer.identification?.id as string,
            front: freelancer.identification?.front as string,
            back: freelancer.identification?.back as string,
        },
        type: "freelancer",
    };

    return {
        status: "success",
        message: "User Found",
        data: parseFreelancer,
    };
}
