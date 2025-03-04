import { Textarea } from "@/components/ui/textarea";
import { useChatMesaging } from "@/services/chat/chat-messaging";
import EmojiPicker from "emoji-picker-react";
import { SendHorizonal, SmilePlus } from "lucide-react";
import { useEffect } from "react";
import { Attaches } from "./attaches";

interface IChatMessaging {
    conversationId: string;
    me: string;
}

export function ChatMessaging({ conversationId, me }: IChatMessaging) {
    const {
        activateWebSocket,
        handleSendMessage,
        messageContent,
        setMessageContent,
        handleSendAttachment,
        handleSendOnKeyDown,
        displayEmoji,
        toggleDisplayEmoji,
        handleSelectEmoji,
        textAreaRef,
    } = useChatMesaging(conversationId, me);
    useEffect(() => {
        if (conversationId) {
            activateWebSocket();
        }
    }, [conversationId, activateWebSocket]);

    return (
        <div className='px-6  pb-3 sm:pt-1 sm:pb-5 h-fit'>
            <div className='flex gap-2 items-center'>
                <div className='flex-1 flex gap-2 items-center relative'>
                    <Textarea
                        ref={textAreaRef}
                        placeholder='Digite sua mensagem...'
                        className='pr-20'
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={handleSendOnKeyDown}
                    />
                    <div className='flex gap-2 absolute right-6'>
                        <Attaches handleSendAttachment={handleSendAttachment} />
                        <span
                            className='cursor-pointer'
                            onClick={toggleDisplayEmoji}
                        >
                            <SmilePlus />
                        </span>
                    </div>
                </div>
                <span onClick={handleSendMessage} className='cursor-pointer'>
                    <SendHorizonal />
                </span>
            </div>
            {displayEmoji && (
                <div className='absolute bottom-16 right-6 z-10'>
                    <EmojiPicker onEmojiClick={handleSelectEmoji} />
                </div>
            )}
        </div>
    );
}
