/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from "@/config/api";
import { WEBSOCKET_URL } from "@/config/define-urls";
import { IConversation, IMessage } from "@/store/chat";
import { supabaseUpload } from "@/utils/supabase-upload";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

interface IUseChatMessaging {
    activateWebSocket: () => void;
    messageContent: string;
    setMessageContent: Dispatch<SetStateAction<string>>;
    handleSendMessage: () => void;
    handleSendAttachment: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => Promise<void>;
    handleSendOnKeyDown: (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => void;
    handleSelectEmoji: (emojiData: any) => void;
    displayEmoji: boolean;
    toggleDisplayEmoji: () => void;
    textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export function useChatMesaging(
    conversationId: string,
    me: string
): IUseChatMessaging {
    const [messageContent, setMessageContent] = useState("");
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    function toggleDisplayEmoji() {
        setDisplayEmoji(!displayEmoji);
    }
    const client = useQueryClient();

    function activateWebSocket() {
        const ws = new WebSocket(`${WEBSOCKET_URL}/message/${conversationId}`);
        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (event) => {
            const commingMessage = JSON.parse(event.data);

            if (commingMessage) {
                const oldMessages = client.getQueryData([
                    "messages",
                    conversationId,
                ]) as IMessage[];
                const newMessages = oldMessages.find(
                    (message) => message.id === commingMessage.id
                )
                    ? oldMessages
                    : [...oldMessages, commingMessage];
                client.setQueryData(["messages", conversationId], newMessages);
            }

            const oldConversations = client.getQueryData([
                "conversations",
                me,
            ]) as IConversation[];

            if (oldConversations) {
                client.setQueryData(
                    ["conversations", me],
                    oldConversations.map((conversation) => {
                        if (conversation.id === conversationId) {
                            return {
                                ...conversation,
                                lastMessage: commingMessage,
                            };
                        }
                        return conversation;
                    })
                );
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket");
        };
    }

    async function handleSendMessage() {
        await api("/message/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: {
                    content: messageContent,
                    senderId: me,
                },
                conversationId,
            }),
        });

        setMessageContent("");
    }

    async function handleSendOnKeyDown(
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Impede quebra de linha no textarea
            if (messageContent !== "") {
                handleSendMessage();
            }
        }
    }

    const handleSelectEmoji = (emojiData: any) => {
        setMessageContent((prev) => prev + emojiData.emoji);
        toggleDisplayEmoji();
        textAreaRef.current?.focus();
    };

    async function handleSendAttachment(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0]; // Obtém o primeiro arquivo selecionado

        if (!file) return; // Se não houver arquivo, sai da função
        const [name, extension] = file.name.split(".");
        const size = file.size;
        const type = file.type;

        const content = await supabaseUpload(file);

        const body = {
            conversationId,
            message: {
                content: content as string,
                senderId: me,
                hasFile: true,
                fileInfo: {
                    name,
                    extension,
                    type,
                    size,
                },
            },
        };

        await api("/message/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    return {
        activateWebSocket,
        messageContent,
        setMessageContent,
        handleSendMessage,
        handleSendOnKeyDown,
        handleSendAttachment,
        handleSelectEmoji,
        displayEmoji,
        toggleDisplayEmoji,
        textAreaRef,
    };
}
