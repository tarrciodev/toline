"use client";
import { useChatWithEntityService } from "@/services/chat/chta-with-owner";
import { MessagesSquare } from "lucide-react";

export function ChatWithEntity({
    entityId,
    entityType,
}: {
    entityId: string;
    entityType: "freelancer" | "client";
}) {
    const { handleChatWithOwner } = useChatWithEntityService(entityId);
    return (
        <div
            className='flex justify-center gap-2 my-2 border border-gary-200 shadow-sm rounded-lg p-2 bg-blue-700 hover:bg-blue-800 text-blue-50 cursor-pointer'
            onClick={handleChatWithOwner}
        >
            <span>
                {entityType === "freelancer"
                    ? "Fazer pergunta"
                    : "Fazer pergunta"}
            </span>{" "}
            <div>
                <MessagesSquare />
            </div>
        </div>
    );
}
