import { api } from "@/config/api";
import { IConversation, useChatStore } from "@/store/chat";
import { useQueryClient } from "@tanstack/react-query";

interface IChatOptions {
    handleDeleteConversation: () => void;
    handleDeleteConversationMessages: () => void;
}

export function useChatOptions(
    conversationId: string,
    me: string
): IChatOptions {
    const client = useQueryClient();
    const oldConversations = client.getQueryData([
        "conversations",
        me,
    ]) as IConversation[];
    const { setSelectedConversation } = useChatStore();
    async function handleDeleteConversation() {
        await api(`/conversation/${conversationId}`, {
            method: "DELETE",
        });

        if (oldConversations) {
            client.setQueryData(
                ["conversations", me],
                oldConversations.filter(
                    conversation => conversation.id !== conversationId
                )
            );
        }
        setSelectedConversation(null);
    }

    async function handleDeleteConversationMessages() {
        await api(`/conversation/messages/delete/${conversationId}`);
        client.setQueryData(["messages", conversationId], []);

        if (oldConversations) {
            client.setQueryData(
                ["conversations", me],
                oldConversations.map(conversation => {
                    if (conversation.id === conversationId) {
                        return {
                            ...conversation,
                            message: null,
                        };
                    }
                    return conversation;
                })
            );
        }
    }

    return {
        handleDeleteConversation,
        handleDeleteConversationMessages,
    };
}
