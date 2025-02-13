/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
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
    const { data: messages, error } = useQuery<IMessage[]>({
        queryKey: ["messages", conversationId],
        queryFn: async () => {
            const data = await api<IMessage[]>(
                `/messages/conversation/${conversationId}`
            );

            return data;
        },
    });
    return (
        <div className='flex-1'>
            <ScrollArea className=' px-6 pt-7 overflow-auto'>
                {messages?.map(message => (
                    <MessageItem key={message.id} message={message} me={me} />
                ))}
            </ScrollArea>
        </div>
    );
}
