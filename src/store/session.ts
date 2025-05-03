// store/session.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
    logged_as: "client" | "freelancer" | null;
    setIsLoggedAs: (logged_as: "client" | "freelancer" | null) => void;
}

export const useSessionStore = create(
    persist<SessionState>(
        (set) => ({
            logged_as: null,
            setIsLoggedAs: (value) => set({ logged_as: value }),
        }),
        {
            name: "session-storage",
        }
    )
);
