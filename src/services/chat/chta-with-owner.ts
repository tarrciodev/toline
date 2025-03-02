import { api } from "@/config/api";
import { IConversation, useChatStore } from "@/store/chat";
import { useMeStore } from "@/store/me";
import { useQuery } from "@tanstack/react-query";

interface IUseChatWithOwnerService {
    handleChatWithOwner: () => Promise<void>;
}
export function useChatWithEntityService(
    entityId: string
): IUseChatWithOwnerService {
    const { setSelectedConversation, setDisplayChatMessage } = useChatStore();
    const { me } = useMeStore();
    const { data } = useQuery<IConversation[]>({
        queryKey: ["conversations", me?.id],
        queryFn: async () => {
            const conversations = await api<IConversation[]>(
                `/conversations/user/${me?.id}`
            );
            return conversations;
        },
    });

    console.log({ data });

    const userOnMyConversations = data?.find((conversation) =>
        conversation.members.some((member) => member.id == entityId)
    );

    async function handleChatWithOwner() {
        if (userOnMyConversations) {
            setSelectedConversation(userOnMyConversations);
            setDisplayChatMessage(true);
            return;
        }

        const createdConversation = await api<IConversation>(
            `/conversation/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    members: [entityId, me?.id],
                }),
            }
        );

        setSelectedConversation(createdConversation);
        setDisplayChatMessage(true);
    }

    return {
        handleChatWithOwner,
    };
}
