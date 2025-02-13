import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatOptions } from "@/services/chat/chat-options";
import { EllipsisVertical } from "lucide-react";

export function ChatOptions({
    conversationId,
    me,
}: {
    conversationId: string;
    me: string;
}) {
    const { handleDeleteConversation, handleDeleteConversationMessages } =
        useChatOptions(conversationId, me);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <span>
                    <EllipsisVertical />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeleteConversationMessages}>
                    Limpar Conversa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteConversation}>
                    Apagar Conversa
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
