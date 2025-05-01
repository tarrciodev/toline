"use client";
import { NotificationsList } from "@/components/dash/notifications";
import { getQueryClient } from "@/lib/get-query-client";
import { useModalStore } from "@/store/modal";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    const queryClient = getQueryClient();
    const { displayModalNotifications } = useModalStore();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {displayModalNotifications && <NotificationsList />}
        </QueryClientProvider>
    );
}
