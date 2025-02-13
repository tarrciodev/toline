"use client";
import { api } from "@/config/api";
import { IConversation, useChatStore } from "@/store/chat";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ConversationItem from "./conversation-item";
import EmptyConversationItem from "./empty-conversation-item";

export default function ConversationList({ me }: { me: string }) {
    const { conversations, setConversations } = useChatStore();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = useQuery<IConversation[]>({
        queryKey: ["conversations", me],
        queryFn: async () => {
            const data = await api<IConversation[]>(
                `/conversations/user/${me}`
            );

            return data;
        },
    });

    useEffect(() => {
        if (data) {
            setConversations(data);
        }
    }, [data, setConversations]);

    console.log(conversations);

    return (
        <div className='flex flex-col gap-3 justify-center'>
            {conversations?.length == 0 ? (
                <EmptyConversationItem />
            ) : (
                <>
                    {conversations.map(conversation => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            me={me}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
