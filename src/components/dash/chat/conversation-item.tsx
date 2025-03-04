import { cn } from "@/lib/utils";
import { IConversation, useChatStore } from "@/store/chat";
import { getTimeOnly } from "@/utils/get-time-only";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import { NoUserAvatar } from "./no-user-avatar";

interface IChatConvesations {
    conversation: IConversation;
    me: string;
    toggleDisplayChatMessage?: () => void;
}

export default function ConversationItem({
    conversation,
    me,
    toggleDisplayChatMessage,
}: IChatConvesations) {
    const friend = conversation?.members?.find((member) => member.id !== me);
    const hasAvatar = friend?.avatarUrl;
    const { setSelectedConversation } = useChatStore();
    function handleSelectConversation() {
        setSelectedConversation(conversation);
        if (toggleDisplayChatMessage) {
            toggleDisplayChatMessage();
        }
    }

    const imTheSender = conversation?.lastMessage?.senderId === me;
    const messageHasAFile = conversation?.lastMessage?.hasFile;
    const fileIsAnImage =
        conversation?.lastMessage?.fileInfo?.type.startsWith("image");
    const hasUnreadMessages = conversation?.messages?.filter(
        (message) => !message?.saw && message?.senderId != me
    );

    return (
        <div
            className='flex gap-2 items-center w-full cursor-pointer'
            onClick={handleSelectConversation}
        >
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
            <div className='flex flex-col gap-1 flex-1'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-gray-800'>
                        {" "}
                        {friend?.username}
                    </p>{" "}
                    {conversation.lastMessage && (
                        <span
                            className={cn(
                                "text-xs",
                                hasUnreadMessages?.length != 0
                                    ? "text-green-700 font-semibold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {getTimeOnly(conversation.lastMessage!.createdAt)}
                        </span>
                    )}
                </div>
                {messageHasAFile ? (
                    <p className='text-xs flex gap-1'>
                        {imTheSender && "Voce:"} enviou{" "}
                        {fileIsAnImage ? "uma imagem" : "um arquivo"}{" "}
                        <Paperclip size={16} />
                    </p>
                ) : (
                    <p className='text-sm text-muted-foreground flex justify-between'>
                        {conversation?.lastMessage?.content}{" "}
                        {hasUnreadMessages?.length != 0 && (
                            <span className='bg-green-700 rounded-full flex justify-center items-center text-xs size-4 text-green-50 font-semibold'>
                                {hasUnreadMessages?.length}
                            </span>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
}
