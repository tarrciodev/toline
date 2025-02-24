import { getMe } from "@/actions/users/get-me";
import { useChatStore } from "@/store/chat";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

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
}: {
    user: IUserFoundForConversationProps;
    toggleDisplayNewConversation: () => void;
}) {
    const { addConversation, setSelectedConversation } = useChatStore();
    const [me, setMe] = useState("");
    useEffect(() => {
        (async () => {
            const data = await getMe();
            setMe(data.id);
        })();
    }, []);

    const client = useQueryClient();

    async function createConversation() {
        const response = await fetch(
            `http://localhost:3333/conversation/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    members: [user.id, me],
                }),
            }
        );
        const data = await response.json();
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
        <div className='flex gap-2 items-center' onClick={createConversation}>
            <Image
                src={`https://github.com/tarcisioteixeira.png`}
                alt='user'
                width={40}
                height={40}
                className='rounded-full'
            />
            <div className='flex flex-col gap-1'>
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
