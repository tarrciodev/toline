import { create } from "zustand";

interface IModal {
    displayModalNotifications: boolean;
    setDisplayModalNotifications: (displayModalNotifications: boolean) => void;
    toggleDisplayModalNotifications: () => void;
}

export const useModalStore = create<IModal>()((set) => ({
    displayModalNotifications: false,
    setDisplayModalNotifications: (displayModalNotifications) =>
        set({ displayModalNotifications }),
    toggleDisplayModalNotifications: () =>
        set((prev) => ({
            displayModalNotifications: !prev.displayModalNotifications,
        })),
}));
