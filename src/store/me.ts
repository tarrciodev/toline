import { create } from "zustand";

export interface MeProps {
    id: string;
    type: string;
    email: string;
    userId: string;
    username: string;
    avatarUrl?: string;
    tag: string;
}
interface EntityState {
    me: MeProps | null;
    setMe: (entity: MeProps) => void;
}

export const useMeStore = create<EntityState>()((set) => ({
    me: null,
    setMe: (me: MeProps) => set({ me }),
}));
