import { EntityProps } from "@/actions/users/get-entity";
import { create } from "zustand";

interface EntityState {
    entity?: EntityProps | null;
    setEntity: (entity: EntityProps | null) => void;
}

export const useEntityStore = create<EntityState>()((set) => ({
    entity: null,
    setEntity: (entity) => set({ entity }),
}));
