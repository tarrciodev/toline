"use client";
import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { useNotify } from "@/hooks/notify";
import { EntityProps } from "@/store/entity";
import { useModalStore } from "@/store/modal";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

export default function NotificationsLink() {
    const { data } = useQuery<EntityProps>({
        queryKey: ["notifications"],
        queryFn: getTolinerAsEntity,
    });

    const { activateWebSocketForNotification } = useNotify(data?.id as string);
    activateWebSocketForNotification();
    const { toggleDisplayModalNotifications } = useModalStore();

    const unreadNotifications =
        data?.notifications?.filter(
            (notification) => !notification.payload.saw
        ) ?? [];
    return (
        <button
            className='cursor-pointer'
            onClick={toggleDisplayModalNotifications}
        >
            {unreadNotifications.length > 0 && (
                <i className='absolute size-6 rounded-full bg-red-800 flex items-center justify-center text-white text-xs top-2 font-semibold border-2 border-white'>
                    {unreadNotifications.length}
                </i>
            )}
            <Bell />
        </button>
    );
}
