"use client";
import { WEBSOCKET_URL } from "@/config/define-urls";
import { EntityProps } from "@/store/entity";
import { useQueryClient } from "@tanstack/react-query";

export function useNotify(target: string) {
    const queryClient = useQueryClient();
    function activateWebSocketForNotification() {
        const ws = new WebSocket(`${WEBSOCKET_URL}/notifications/${target}`);
        ws.onopen = () => {
            console.log("Connected to WebSocket from notifications");
        };

        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);

            if (notification.target === target) {
                const oldNotifications = queryClient.getQueryData([
                    "notifications",
                ]) as EntityProps;

                if (oldNotifications.id) {
                    if (
                        oldNotifications.notifications?.find(
                            (nt) => nt.id === notification.id
                        )
                    ) {
                        return;
                    }
                    const notifications = oldNotifications.notifications ?? [];
                    const newNotifications = [...notifications, notification];
                    queryClient.setQueryData(["notifications"], {
                        ...oldNotifications,
                        notifications: newNotifications,
                    });

                    console.log({
                        notifications,
                    });
                }
            }
            ws.onclose = () => {
                console.log("Disconnected from WebSocket");
            };
        };
    }
    return {
        activateWebSocketForNotification,
    };
}
