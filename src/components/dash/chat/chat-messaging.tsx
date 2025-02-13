import { Textarea } from "@/components/ui/textarea";
import { useChatMesaging } from "@/services/chat/chat-messaging";
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
    } = useChatMesaging(conversationId, me);
    useEffect(() => {
        if (conversationId) {
            activateWebSocket();
        }
    }, [conversationId, activateWebSocket]);

    return (
        <div className='px-6 py-7'>
            <div className='flex gap-2 items-center'>
                <div className='flex-1 flex gap-2 items-center relative'>
                    <Textarea
                        placeholder='Digite sua mensagem...'
                        className='pr-20'
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                    />
                    <div className='flex gap-2 absolute right-6'>
                        <Attaches handleSendAttachment={handleSendAttachment} />
                        <span className='cursor-pointer'>
                            <SmilePlus />
                        </span>
                    </div>
                </div>
                <span onClick={handleSendMessage} className='cursor-pointer'>
                    <SendHorizonal />
                </span>
            </div>
        </div>
    );
}
