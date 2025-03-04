"use client";
import { ChatHeader } from "@/components/dash/chat/chat-header";
import { ChatMessageList } from "@/components/dash/chat/chat-message-list";
import { ChatMessaging } from "@/components/dash/chat/chat-messaging";
import { ChatConversationContainer } from "@/components/dash/chat/conversation-container";

import useChatService from "@/services/chat";
import { useChatStore } from "@/store/chat";
import { MessageCircle, MessageCircleOff } from "lucide-react";
import { useState } from "react";

export function ChatMobile() {
    const [displayNewConversation, setDisplayNewConversation] = useState(false);
    const {
        selectedConversation,
        displayChatMessage,
        setDisplayChatMessage,
        conversations,
        setConversations,
        displayChat,
        setDisplayChat,
    } = useChatStore();

    function togleDisplayNewConversation() {
        setDisplayNewConversation((prev) => !prev);
    }

    function toggleDisplayChat() {
        setDisplayChat(!displayChat);
    }

    function toggleDisplayChatMessage() {
        setDisplayChatMessage(!displayChatMessage);
    }

    const { chatRef, me, unreadMessages, activateWebSocketForNotification } =
        useChatService({
            displayChatMessage,
            setDisplayChatMessage,
            setConversations,
        });

    activateWebSocketForNotification();

    return (
        <div className='flex sm:hidden'>
            <span
                ref={chatRef}
                className='cursor-pointer rlative'
                onClick={() => toggleDisplayChat()}
            >
                {unreadMessages && unreadMessages?.length != 0 && (
                    <i className='absolute size-6 rounded-full bg-red-800 flex items-center justify-center text-white text-xs top-2 font-semibold border-2 border-white'>
                        {unreadMessages.length!}
                    </i>
                )}
                {displayChat && <p>tarcio</p>}
                <MessageCircle />
            </span>
            {displayChat && (
                <div className='fixed left-0 w-full h-full'>
                    <div className='flex gap-2'>
                        <div className='h-dvh sm:h-[88vh] bg-white w-full px-4 py-6 relative'>
                            <ChatConversationContainer
                                me={me!}
                                togleDisplayNewConversation={
                                    togleDisplayNewConversation
                                }
                                toggleDisplayChat={toggleDisplayChat}
                                displayNewConversation={displayNewConversation}
                                conversations={conversations}
                                toggleDisplayChatMessage={
                                    toggleDisplayChatMessage
                                }
                            />
                        </div>
                    </div>
                </div>
            )}

            {displayChatMessage && (
                <div className='flex-1 bg-white top-0 left-0  fixed w-full flex flex-col h-dvh '>
                    {selectedConversation ? (
                        <>
                            <ChatHeader
                                conversation={selectedConversation!}
                                me={me?.id as string}
                                toggleDisplayChatMessage={
                                    toggleDisplayChatMessage
                                }
                            />
                            <ChatMessageList
                                conversationId={
                                    selectedConversation?.id as string
                                }
                                me={me?.id as string}
                            />
                            <ChatMessaging
                                conversationId={
                                    selectedConversation?.id as string
                                }
                                me={me?.id as string}
                            />
                        </>
                    ) : (
                        <div className='flex justify-center items-center flex-col h-full gap-2 text-blue-800'>
                            <span>
                                <MessageCircleOff size={90} />
                            </span>
                            <span>Selecione ou inicie uma nova conversa</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
