/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { MessageItem } from "./message-item";

export interface IMessage {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
    conversationId: string;
    saw: boolean;
    hasFile: boolean;
    fileInfo?: {
        name: string;
        extension: string;
        type: string;
        size: number;
    };
}

export function ChatMessageList({
    conversationId,
    me,
}: {
    conversationId: string;
    me: string;
}) {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    const { data: messages, error } = useQuery<IMessage[]>({
        queryKey: ["messages", conversationId],
        queryFn: async () => {
            const data = await api<IMessage[]>(
                `/messages/conversation/${conversationId}`
            );

            return data;
        },
    });

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [messages]);
    return (
        <div className='flex-1'>
            <ScrollArea className=' px-6 pt-1 h-[77vh] sm:h-[66vh] overflow-auto'>
                {messages?.map((message, index) => (
                    <div
                        key={message.id}
                        ref={
                            index === messages.length - 1
                                ? lastMessageRef
                                : null
                        }
                    >
                        <MessageItem message={message} me={me} />
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
