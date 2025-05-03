"use client";
import { IDashUser } from "@/components/dash-header";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSessionStore } from "@/store/session";
import { setCookieStore } from "@/utils/cookie-store";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NoUserAvatar } from "../chat/no-user-avatar";
import { SignoutButton } from "./signout-button";

export function UserHeaderIcon({ user }: { user: IDashUser }) {
    const { logged_as, setIsLoggedAs } = useSessionStore();

    const pathname = usePathname();
    const route = useRouter();

    function handleCick(value: "client" | "freelancer") {
        setIsLoggedAs(value);
        setCookieStore("logged_as", value);
        if (pathname !== "/dash") {
            route.push("/dash");
        }
    }

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
                {logged_as === "freelancer" && (
                    <DropdownMenuItem onClick={() => handleCick("client")}>
                        <NoUserAvatar username={user.username} variante='sm' />
                        Entrar como cliente
                    </DropdownMenuItem>
                )}
                {logged_as === "client" && (
                    <DropdownMenuItem onClick={() => handleCick("freelancer")}>
                        <NoUserAvatar username={user.username} variante='sm' />
                        Entrar como freelancer
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <SignoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
