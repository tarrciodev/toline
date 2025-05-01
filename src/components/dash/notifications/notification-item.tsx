"use client";
import { api } from "@/config/api";
import { cn } from "@/lib/utils";
import { EntityProps, INotification } from "@/store/entity";
import { useModalStore } from "@/store/modal";
import { getTimeElapsed } from "@/utils/get-time-elapsed";
import { useQueryClient } from "@tanstack/react-query";
import { Axe, DollarSign, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function NotificationItem({
    notification,
}: {
    notification: INotification;
}) {
    const destinations = {
        "New Subscription": `/dash/client/project/${notification.payload.redirectId}`,
        "Proposta Aceita": "/dash/freelancer/proposals?status=accepted",
        "Novo Pagamento": "/dash/client/project",
    };
    const { setDisplayModalNotifications } = useModalStore();
    const route = useRouter();
    const queryClient = useQueryClient();
    async function handleNotification() {
        if (!notification.payload.saw) {
            const newNotifications = await api<INotification>(
                `/notifications/${notification.target}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ notificationId: notification.id }),
                }
            );

            const oldNotifications = queryClient.getQueryData([
                "notifications",
            ]) as EntityProps;

            if (oldNotifications.notifications) {
                queryClient.setQueryData(["notifications"], {
                    ...oldNotifications,
                    notifications: newNotifications,
                });
            }
        }

        type NotificationType =
            | "New Subscription"
            | "Proposta Aceita"
            | "Novo Pagamento";

        setDisplayModalNotifications(false);
        route.push(destinations[notification.type as NotificationType]);
    }
    return (
        <button
            onClick={handleNotification}
            className={cn(
                "flex flex-col px-4 border-t border-gray-100 py-2 cursor-pointer",
                notification.payload.saw || "bg-blue-100"
            )}
        >
            <div className='flex justify-between '>
                <p
                    className={cn(
                        "font-semibold flex gap-1 mb-2",
                        notification.type === "New Subscription" &&
                            "text-red-700",
                        notification.type === "Proposta Aceita" &&
                            "text-purple-700",
                        notification.type === "Novo Pagamento" &&
                            "text-blue-700"
                    )}
                >
                    <span className='text-xl'>
                        {notification.type === "New Subscription" && (
                            <UserPlus />
                        )}
                        {notification.type === "Proposta Aceita" && <Axe />}
                        {notification.type === "Novo Pagamento" && (
                            <DollarSign />
                        )}
                    </span>
                    {notification.type}
                </p>
                <span className='text-sm'>
                    {getTimeElapsed(notification.payload.createdAt)
                        .replace("cerca de", "")
                        .replace("menos de", "")}
                </span>
            </div>
            <p>{notification.payload.message}</p>
        </button>
    );
}
