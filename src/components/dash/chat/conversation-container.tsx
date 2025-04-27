import { IConversation } from "@/store/chat";
import { IMe } from "@/store/me";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import ConversationList from "./conversation-list";
import { NewConversation } from "./new-conversation";

interface IChatConversationContainerProps {
    displayNewConversation: boolean;
    me: IMe;
    togleDisplayNewConversation: () => void;
    conversations: IConversation[];
    toggleDisplayChat?: () => void;
    toggleDisplayChatMessage?: () => void;
}

export function ChatConversationContainer({
    displayNewConversation,
    togleDisplayNewConversation,
    me,
    conversations,
    toggleDisplayChat,
    toggleDisplayChatMessage,
}: IChatConversationContainerProps) {
    return (
        <div>
            <NewConversation
                displayNewConversation={displayNewConversation}
                me={me!}
                togleDisplayNewConversation={togleDisplayNewConversation}
            />
            <div className='border-b border-gray-200 py-2 mb-3 flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <span
                        className='flex sm:hidden'
                        onClick={toggleDisplayChat}
                    >
                        <ArrowLeft />
                    </span>
                    <p className='font-semibold text-xl'>Suas Conversas</p>
                </div>
                <span
                    className='cursor-pointer'
                    onClick={togleDisplayNewConversation}
                >
                    <MessageSquarePlus />
                </span>
            </div>
            <ConversationList
                me={me?.id as string}
                conversations={conversations}
                toggleDisplayChatMessage={toggleDisplayChatMessage}
            />
        </div>
    );
}
