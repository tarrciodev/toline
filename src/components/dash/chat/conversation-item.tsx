import { IConversation, useChatStore } from "@/store/chat";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import { NoUserAvatar } from "./no-user-avatar";

interface IChatConvesations {
    conversation: IConversation;
    me: string;
}

export default function ConversationItem({
    conversation,
    me,
}: IChatConvesations) {
    const friend = conversation?.members?.find((member) => member.id !== me);
    const hasAvatar = friend?.avatarUrl;
    const { setSelectedConversation } = useChatStore();
    function handleSelectConversation() {
        setSelectedConversation(conversation);
    }

    const imTheSender = conversation?.message?.senderId === me;
    const messageHasAFile = conversation?.message?.hasFile;
    const fileIsAnImage =
        conversation?.message?.fileInfo?.type.startsWith("image");

    return (
        <div
            className='flex gap-2 items-center w-full'
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
                    <span className='text-sm text-muted-foreground'>12:00</span>
                </div>
                {messageHasAFile ? (
                    <p className='text-xs flex gap-1'>
                        {imTheSender && "Voce:"} enviou{" "}
                        {fileIsAnImage ? "uma imagem" : "um arquivo"}{" "}
                        <Paperclip size={16} />
                    </p>
                ) : (
                    <p className='text-sm text-muted-foreground'>
                        {conversation?.message?.content}
                    </p>
                )}
            </div>
        </div>
    );
}
