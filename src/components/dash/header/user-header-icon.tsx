"use client";
import { IDashUser } from "@/components/dash-header";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { NoUserAvatar } from "../chat/no-user-avatar";
import { SignoutButton } from "./signout-button";

export function UserHeaderIcon({ user }: { user: IDashUser }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'>
                {user?.avatarUrl ? (
                    <div className='relative cursor-pointer'>
                        <Image
                            src={user.avatarUrl}
                            alt='user avatar'
                            width={100}
                            height={100}
                            className='size-10 rounded-full'
                        />
                        <span className='bg-gray-100 rounded-full border border-white absolute -bottom-3 -right-2 shadow-2xl'>
                            <ChevronDown />
                        </span>
                    </div>
                ) : (
                    <div className='relative'>
                        <NoUserAvatar username={user.username} />
                        <span className='bg-gray-100 rounded-full border border-white absolute -bottom-3 -right-2'>
                            <ChevronDown />
                        </span>
                    </div>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <SignoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
