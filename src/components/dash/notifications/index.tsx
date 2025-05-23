"use client";
import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { INotification } from "@/store/entity";
import { useModalStore } from "@/store/modal";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { NoNotifications } from "./no-notifications";
import { NotificationItem } from "./notification-item";

export function NotificationsList() {
    const { setDisplayModalNotifications } = useModalStore();
    const { data: notifications } = useQuery<INotification[]>({
        queryKey: ["notifications-list"],
        queryFn: async () => {
            const entity = await getTolinerAsEntity();
            const notifications = entity?.notifications ?? [];
            return notifications;
        },
    });

    return (
        <div className='absolute w-full  sm:max-w-[20vw] top-0 sm:top-[10vh] sm:right-10  bg-white shadow-2xl  h-[100dvh] sm:h-full sm:max-h-[90vh] overflow-auto z-[100] border border-gary-100 rounded-lg'>
            <header>
                <h1 className='flex justify-between px-4 py-2 text-2xl font-semibold'>
                    Notificações{" "}
                    <button onClick={() => setDisplayModalNotifications(false)}>
                        <ChevronDown />
                    </button>
                </h1>
            </header>
            <div className='flex flex-col'>
                {(notifications ?? []).length === 0 ? (
                    <NoNotifications />
                ) : (
                    <>
                        {notifications?.map((notification) => (
                            <NotificationItem
                                key={notification.payload.createdAt}
                                notification={notification}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
