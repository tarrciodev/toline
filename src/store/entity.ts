import { IProject } from "@/actions/projects/get-projects";
import { create } from "zustand";

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
    concludedAt?: string;
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
        toliner: {
            id: string;
            name: string;
            avatarUrl?: string;
            userId: string;
        };
        estimatedTime?: string;
        requiredInformations?: string;
        quotation?: number;
        similarExperiences?: string;
        createdAt: string;
    }>;
    owner?: {
        name: string;
        id: string;
        userId: string;
    };
    freelancer?: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
};

export type ShowCaseProps = {
    id: string;
    title: string;
    description: string;
    cover: string;
    assets: Array<string>;
};

export interface INotification {
    id: string;
    type: string;
    target: string;
    payload: {
        message: string;
        saw: boolean;
        createdAt: string;
        redirectId: string;
    };
}

export type PaymentSummary = {
    id: string;
    ammount: number;
    createdAt: Date; // because toLocaleDateString() returns a string
    isVerified: boolean;
    status: "completed" | "pending" | "failed";
    project: {
        id: string;
        name: string;
    };
    freelancer: {
        id?: string; // optional, because of optional chaining
        name?: string; // optional, because of optional chaining
    };
    client?: {
        id: string;
        name: string;
    };
};

export type EntityProps = {
    id: string;
    name: string;
    email: string;
    clientBio?: string;
    freelancerBio?: string;
    isVerified?: boolean;
    userId: string;
    projects?: ProjectFullProps[];
    projectsFreelanced: IProject[];
    specialization?: {
        id: string;
        name: string;
    }[];
    createdAt: string;
    avatarUrl?: string;
    balance: {
        ammount: number;
    };
    type: "freelancer" | "client";
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
    banckAccount?: {
        cardName: string;
        cardNumber: string;
        bankName: string;
    };
    notifications?: INotification[];
    Payments?: PaymentSummary[];
    jobDescription?: string;
};

interface EntityState {
    entity?: EntityProps | null;
    setEntity: (entity: EntityProps | null) => void;
}

export const useEntityStore = create<EntityState>()((set) => ({
    entity: null,
    setEntity: (entity) => set({ entity }),
}));
