import { api } from "@/config/api";
import { IConversation, useChatStore } from "@/store/chat";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { NoUserAvatar } from "./chat/no-user-avatar";

export interface IUserFoundForConversationProps {
    id: string;
    email: string;
    tag: string;
    avatarUrl: string;
    username: string;
}
export function UserFoundForConversation({
    user,
    toggleDisplayNewConversation,
    me,
}: {
    user: IUserFoundForConversationProps;
    toggleDisplayNewConversation: () => void;
    me: string;
}) {
    const { addConversation, setSelectedConversation } = useChatStore();

    const client = useQueryClient();

    async function createConversation() {
        const data = await api<IConversation>(`/conversation/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                members: [user.id, me],
            }),
        });
        addConversation(data);
        setSelectedConversation(data);
        client.invalidateQueries({
            queryKey: ["conversations", me],
        });
        setTimeout(() => {
            toggleDisplayNewConversation();
        }, 1000);
    }
    return (
        <div
            className='flex gap-2 items-center cursor-pointer'
            onClick={createConversation}
        >
            {user.avatarUrl ? (
                <Image
                    src={user.avatarUrl as string}
                    alt='user'
                    width={40}
                    height={40}
                    className='rounded-full'
                />
            ) : (
                <NoUserAvatar username={user.username!} />
            )}
            <div className='flex flex-col gap-1 cursor-pointer'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-gray-800'> {user.tag}</p>{" "}
                </div>
                <p className='text-sm text-muted-foreground'>
                    Deixe uma mensagem
                </p>
            </div>
        </div>
    );
}
