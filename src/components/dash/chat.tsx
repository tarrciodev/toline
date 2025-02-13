"use client";
import { getUser } from "@/actions/users/get-user";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useChatStore } from "@/store/chat";
import { useMeStore } from "@/store/me";
import {
    MessageCircle,
    MessageCircleOff,
    MessageSquarePlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ChatHeader } from "./chat/chat-header";
import { ChatMessageList } from "./chat/chat-message-list";
import { ChatMessaging } from "./chat/chat-messaging";
import ConversationList from "./chat/conversation-list";
import { NewConversation } from "./new-conversation";

export default function Chat() {
    const [displayNewConversation, setDisplayNewConversation] = useState(false);
    const { selectedConversation } = useChatStore();
    const { setMe, me } = useMeStore();
    useEffect(() => {
        (async () => {
            const me = await getUser();
            setMe(me);
        })();
    }, [setMe]);

    function togleDisplayNewConversation() {
        setDisplayNewConversation((prev) => !prev);
    }

    return (
        <Sheet>
            <SheetTrigger>
                <span>
                    <MessageCircle />
                </span>
            </SheetTrigger>
            <SheetContent className='bg-white/80'>
                <SheetHeader className='py-3'>
                    <SheetTitle>Toline Chat</SheetTitle>
                </SheetHeader>
                <div className='flex gap-2'>
                    <div className='h-[88vh] bg-white w-[40%] px-4 py-6 relative'>
                        <NewConversation
                            displayNewConversation={displayNewConversation}
                            togleDisplayNewConversation={
                                togleDisplayNewConversation
                            }
                        />
                        <div className='border-b border-gray-200 py-2 mb-3 flex justify-between'>
                            <p className='font-semibold text-xl'>
                                Suas Conversas
                            </p>
                            <span
                                className='cursor-pointer'
                                onClick={togleDisplayNewConversation}
                            >
                                <MessageSquarePlus />
                            </span>
                        </div>
                        <ConversationList me={me?.id as string} />
                    </div>
                    <div className='flex-1 bg-white flex flex-col h-[88vh]'>
                        {selectedConversation ? (
                            <>
                                <ChatHeader
                                    conversation={selectedConversation!}
                                    me={me?.id as string}
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
                                <span>
                                    Selecione ou inicie uma nova conversa
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
