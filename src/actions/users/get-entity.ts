"use server";

import { getClientByEmail } from "../client/get-client-by-email";
import { getFreelancerByEmail } from "../freelancer/get-freelancer-by-email";
import { getUser } from "./get-user";

export type ProjectFullProps = {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    category: string;
    subcategory?: string;
    freelancerId?: string;
    dueDate?: string;
    skills?: {
        id: string;
        name: string;
    }[];
    payment?: {
        id: string;
        ammount: number;
        createdAt: string;
        clientInvoce: string;
        systemInvoce?: string;
        verifiedFromSystem: boolean;
    };
    quotation?: {
        id: string;
        ammount: number;
        description: string;
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
    owner?: {
        name: string;
        id: string;
    };
};

export type ShowCaseProps = {
    id: string;
    title: string;
    description: string;
    cover: string;
    assets: Array<{
        id: string;
        link: string;
    }>;
};

export type EntityProps = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    bio?: string;
    isVerified?: boolean;
    freelacerId?: string;
    projects?: ProjectFullProps[];

    certifications?: {
        id: string;
        certificationName: string;
        link: string;
    }[];
    skills?: {
        id: string;
        name: string;
        categoryId: string;
        subcategoryId?: string;
        tags?: string;
    }[];
    identification?: {
        id: string;
        front: string;
        back: string;
    };
    subscriptions?: Array<{
        id: string;
        project: {
            status: string;
            freelancerId?: string;
        };
    }>;
    showCases?: ShowCaseProps[];
    type: string;
};

export async function getUserAsEntity(): Promise<{
    status: "error" | "success";
    message: string;
    data?: EntityProps;
}> {
    const user = await getUser();

    if (user.type == "freelancer") {
        const entity = await getFreelancerByEmail(user.email);

        return {
            ...entity,
            data: {
                id: entity.data?.id ?? "",
                name: entity.data?.name ?? "",
                email: entity.data?.email ?? "",
                createdAt: entity.data?.createdAt ?? "",
                bio: entity.data?.bio,
                projects: entity.data?.projects,
                certifications: entity.data?.certifications,
                skills: entity.data?.skills,
                identification: entity.data?.identification,
                subscriptions: entity.data?.subscriptions,
                type: user.type as string,
                isVerified: entity.data?.isVerified,
                showCases: entity.data?.showCases,
            },
        };
    }

    const entity = await getClientByEmail(user.email);
    return {
        ...entity,
        data: {
            id: entity.data?.id ?? "",
            name: entity.data?.name ?? "",
            email: entity.data?.email ?? "",
            createdAt: entity.data?.createdAt ?? "",
            bio: entity.data?.bio,
            projects: entity.data?.projects,
            type: user.type as string,
        },
    };
}
