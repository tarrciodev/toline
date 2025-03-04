"use client";
import { IConversation } from "@/store/chat";
import ConversationItem from "./conversation-item";
import EmptyConversationItem from "./empty-conversation-item";

export default function ConversationList({
    conversations,
    me,
    toggleDisplayChatMessage,
}: {
    conversations: IConversation[];
    me: string;
    toggleDisplayChatMessage?: () => void;
}) {
    return (
        <div className='flex flex-col gap-3 justify-center'>
            {conversations?.length == 0 ? (
                <EmptyConversationItem />
            ) : (
                <>
                    {conversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            me={me}
                            toggleDisplayChatMessage={toggleDisplayChatMessage}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
