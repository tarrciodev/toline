import { getMe } from "@/actions/users/get-me";
import { api } from "@/config/api";
import { WEBSOCKET_URL } from "@/config/define-urls";
import { IConversation, IMessage } from "@/store/chat";
import { MeProps, useMeStore } from "@/store/me";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefObject, useEffect, useRef, useState } from "react";

interface IChatServiceResponse {
    chatRef: RefObject<HTMLSpanElement | null>;
    me: MeProps | null;
    unreadMessages: IConversation[] | null | undefined;
    activateWebSocketForNotification: () => void;
}
export default function useChatService({
    displayChatMessage,
    setDisplayChatMessage,
    setConversations,
}: {
    displayChatMessage: boolean;
    setDisplayChatMessage: (displayChatMessage: boolean) => void;
    setConversations: (conversations: IConversation[]) => void;
}): IChatServiceResponse {
    const chatRef = useRef<HTMLSpanElement | null>(null);
    const { setMe, me } = useMeStore();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = useQuery<IConversation[] | null>({
        queryKey: ["conversations", me?.id],
        queryFn: async () => {
            const data = await api<IConversation[] | null>(
                `/conversations/user/${me?.id}`
            );

            return data;
        },
    });
    const client = useQueryClient();

    const conversations = client.getQueryData(["conversations", me?.id]) as
        | IConversation[]
        | null
        | undefined;

    const [unreadMessages, setUnreadMessages] = useState<
        IConversation[] | null | undefined
    >(null);

    useEffect(() => {
        if (conversations) {
            const data = conversations.filter(
                (conversation) =>
                    conversation.lastMessage?.saw == false &&
                    conversation.lastMessage.senderId != me?.id
            );
            setUnreadMessages(data);
        }
    }, [conversations, setUnreadMessages, me]);

    useEffect(() => {
        if (data) {
            setConversations(data);
        }
    }, [data, setConversations]);

    useEffect(() => {
        (async () => {
            const data = await getMe();
            setMe(data);
            if (displayChatMessage) {
                if (window.innerWidth > 640) {
                    chatRef.current?.click();
                    // setDisplayChatMessage(false);
                }
            }
        })();
    }, [setMe, displayChatMessage, setDisplayChatMessage]);

    function activateWebSocketForNotification() {
        const ws = new WebSocket(`${WEBSOCKET_URL}/message/notification`);
        ws.onopen = () => {
            console.log("Connected to WebSocket from header");
        };

        ws.onmessage = (event) => {
            const commingMessage = JSON.parse(event.data) as IMessage;
            console.log({ commingMessage });

            if (!conversations) {
                client.invalidateQueries({
                    queryKey: ["conversations", me?.id],
                });
            }

            if (
                commingMessage &&
                commingMessage.senderId !== me?.id &&
                conversations?.some(
                    (conversation) =>
                        conversation.id === commingMessage.conversationId
                )
            ) {
                const findConversation = conversations.find(
                    (conversation) =>
                        conversation.id === commingMessage.conversationId
                );

                if (findConversation) {
                    findConversation.lastMessage = commingMessage;
                    setUnreadMessages((prev) => {
                        return prev?.map((conversation) => {
                            if (
                                conversation.id ===
                                commingMessage.conversationId
                            ) {
                                return findConversation;
                            }

                            return conversation;
                        });
                    });
                }
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket");
        };
    }

    return {
        chatRef,
        me,
        unreadMessages,
        activateWebSocketForNotification,
    };
}
