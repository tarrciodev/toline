import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IMember {
    id: string;
    type: string;
    email: string;
    userId: string;
    username: string;
    avatarUrl?: string;
    tag: string;
}

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

export interface IConversation {
    id: string;
    projectId?: string;
    members: IMember[];
    lastMessage?: IMessage;
    messages: IMessage[];
}

interface ChatProps {
    conversations: IConversation[];
    setConversations: (conversations: IConversation[]) => void;
    selectedConversation: IConversation | null;
    setSelectedConversation: (
        selectedConversation: IConversation | null
    ) => void;
    addConversation: (conversation: IConversation) => void;
    displayChatMessage: boolean;
    setDisplayChatMessage: (displayChatMessage: boolean) => void;
}

// Persisting only `selectedConversation`
export const useChatStore = create<ChatProps>()(
    persist(
        (set) => ({
            conversations: [],
            displayChatMessage: false,
            setDisplayChatMessage: (displayChatMessage) =>
                set({ displayChatMessage }),
            setConversations: (conversations) => set({ conversations }),
            selectedConversation: null,
            setSelectedConversation: (selectedConversation) =>
                set({ selectedConversation }),
            addConversation: (conversation) =>
                set((state) => ({
                    conversations: [...state.conversations, conversation],
                })),
        }),
        {
            name: "selected-conversation-storage", // Key for localStorage
            partialize: (state) => ({
                selectedConversation: state.selectedConversation, // Persist only this
            }),
        }
    )
);
