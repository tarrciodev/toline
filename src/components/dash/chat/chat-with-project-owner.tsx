"use client";
import { useChatWithOwnerService } from "@/services/chat/chta-with-owner";
import { MessagesSquare } from "lucide-react";

export function ChatWithProjectOwner({
    owner,
}: {
    owner: { id: string; name: string; userId: string };
}) {
    const { handleChatWithOwner } = useChatWithOwnerService({ owner });
    return (
        <div
            className='flex justify-center gap-2 my-2 border border-gary-200 shadow-sm rounded-lg p-2 bg-blue-700 hover:bg-blue-800 text-blue-50 cursor-pointer'
            onClick={handleChatWithOwner}
        >
            <span>Converçar com o Proprietário</span>{" "}
            <div>
                <MessagesSquare />
            </div>
        </div>
    );
}
