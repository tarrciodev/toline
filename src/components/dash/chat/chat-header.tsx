import { IConversation } from "@/store/chat";
import Image from "next/image";
import { ChatOptions } from "./chat-options";
import { NoUserAvatar } from "./no-user-avatar";

interface IChatHeader {
    conversation: IConversation;
    me: string;
}
export function ChatHeader({ conversation, me }: IChatHeader) {
    const friend = conversation?.members?.find((member) => member.id !== me);
    const hasAvatar = friend?.avatarUrl;

    return (
        <div className='flex items-center justify-between p-3 border-b border-gray-200'>
            <div className='flex gap-2 items-center'>
                {hasAvatar ? (
                    <Image
                        src={friend.avatarUrl as string}
                        alt='user'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                ) : (
                    <NoUserAvatar username={friend?.username as string} />
                )}
                <p className='font-semibold text-gray-800'>
                    {friend?.username}
                </p>
            </div>
            <ChatOptions me={me} conversationId={conversation.id} />
        </div>
    );
}
