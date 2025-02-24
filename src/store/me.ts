import { create } from "zustand";

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

export interface MeProps {
    id: string;
    type: string;
    email: string;
    userId: string;
    username: string;
    avatarUrl?: string;
    tag: string;
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
}
interface EntityState {
    me: MeProps | null;
    setMe: (entity: MeProps) => void;
}

export const useMeStore = create<EntityState>()((set) => ({
    me: null,
    setMe: (me: MeProps) => set({ me }),
}));
