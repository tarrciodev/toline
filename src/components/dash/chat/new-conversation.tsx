"use client";
import { api } from "@/config/api";
import { cn } from "@/lib/utils";
import { IMe } from "@/store/me";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
    IUserFoundForConversationProps,
    UserFoundForConversation,
} from "../user-found-for-conversation";

interface INewConversationProps {
    displayNewConversation: boolean;
    togleDisplayNewConversation: () => void;
    me: IMe;
}

export function NewConversation({
    togleDisplayNewConversation,
    displayNewConversation,
    me,
}: INewConversationProps) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = useQuery<IUserFoundForConversationProps[]>({
        queryKey: ["conversations", debouncedSearch],
        queryFn: async () => {
            const data = await api<IUserFoundForConversationProps[]>(
                `/conversations/search-user-for-conversation/me/${me.tag}?search=${debouncedSearch}`
            );
            return data;
        },
    });

    const debounce = useDebouncedCallback((value: string) => {
        setDebouncedSearch(value);
    }, 500);

    function handleSearch(value: string) {
        setSearch(value);
        debounce(value);
    }

    return (
        <div
            className={cn(
                "absolute h-full bg-white w-full px-4 py-6 left-0 transition-all duration-700",
                displayNewConversation ? "top-0" : "top-[100vh]"
            )}
        >
            <div className='flex justify-between border-b border-gray-200 py-2 mb-3'>
                <span
                    className='cursor-pointer'
                    onClick={togleDisplayNewConversation}
                >
                    <ArrowLeft />
                </span>{" "}
                <p className='font-semibold text-xl'>Nova Conversa</p>
            </div>
            <div>
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    value={search}
                    className='w-full border-b border-gray-200 py-2 mb-3 px-4'
                    placeholder='Buscar Conversas'
                />
            </div>
            <div className='mt-2 flex flex-col gap-3'>
                {data?.map((user) => (
                    <UserFoundForConversation
                        user={user}
                        key={user.id}
                        toggleDisplayNewConversation={
                            togleDisplayNewConversation
                        }
                        me={me.id}
                    />
                ))}
            </div>
        </div>
    );
}
