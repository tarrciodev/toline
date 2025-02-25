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

export type EntityProps = {
    id: string;
    name: string;
    email: string;
    bio?: string;
    isVerified?: boolean;
    userId: string;
    projects?: ProjectFullProps[];
    createdAt: string;
    avatarUrl?: string;
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
};

interface EntityState {
    entity?: EntityProps | null;
    setEntity: (entity: EntityProps | null) => void;
}

export const useEntityStore = create<EntityState>()((set) => ({
    entity: null,
    setEntity: (entity) => set({ entity }),
}));
