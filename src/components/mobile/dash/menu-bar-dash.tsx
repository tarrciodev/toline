"use client";
import { handleSignout } from "@/actions/users/signout";
import { NoUserAvatar } from "@/components/dash/chat/no-user-avatar";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useEntityStore } from "@/store/entity";
import { useSessionStore } from "@/store/session";
import { setCookieStore } from "@/utils/cookie-store";
import { Menu } from "lucide-react";
import Link from "next/link";

import { useRef } from "react";

export function MenuBarDash() {
    const { entity } = useEntityStore();
    const { logged_as, setIsLoggedAs } = useSessionStore();

    const triggerRef = useRef<HTMLSpanElement | null>(null);

    function handleCick(value: "client" | "freelancer") {
        setIsLoggedAs(value);
        setCookieStore("logged_as", value);
        triggerRef.current?.click();
    }

    function handleTriggerClick() {
        if (triggerRef.current) {
            triggerRef.current.click();
        }
    }
    return (
        <div className='flex sm:hidden'>
            <Drawer>
                <DrawerTrigger asChild>
                    <span ref={triggerRef}>
                        <Menu />
                    </span>
                </DrawerTrigger>
                <DrawerContent className='px-8 pb-10'>
                    <DrawerHeader>
                        <DrawerTitle>Dashboard</DrawerTitle>
                    </DrawerHeader>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <p className='font-semibold text-xl py-1'>
                                    Geral
                                </p>
                                <nav>
                                    <ul className='flex flex-col space-x-6'>
                                        <Link
                                            onClick={handleTriggerClick}
                                            href='/dash/projects'
                                            className='text-gray-700 hover:text-blue-60 py-2 border-y border-gray-200 w-full'
                                        >
                                            Projects
                                        </Link>
                                        <Link
                                            onClick={handleTriggerClick}
                                            href='/dash/freelancers'
                                            className='text-gray-700 hover:text-blue-600 border-y py-2 border-gray-200 w-full'
                                        >
                                            Freelancers
                                        </Link>
                                        <Link
                                            onClick={handleTriggerClick}
                                            href='/blog'
                                            className='text-gray-700 hover:text-blue-600 border-y py-2 border-gray-200 w-full'
                                        >
                                            Blog
                                        </Link>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <p className='font-semibold text-xl py-1'>
                                    Pessoal
                                </p>
                                <nav>
                                    <ul className='flex flex-col space-x-6'>
                                        <li className='py-2 border-y border-gray-200 w-full'>
                                            <Link
                                                onClick={handleTriggerClick}
                                                href={
                                                    logged_as === "freelancer"
                                                        ? "/dash/freelancer/proposals?status=sent"
                                                        : "/dash/clients/projects?query=published"
                                                }
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Meus Projectos
                                            </Link>
                                        </li>
                                        <li className='py-2 border-b border-gray-200 w-full'>
                                            <Link
                                                onClick={handleTriggerClick}
                                                href={`/dash/profile/${entity?.id}`}
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Meu Perfil
                                            </Link>
                                        </li>
                                        {logged_as === "freelancer" && (
                                            <li className='py-2 border-b border-gray-200 w-full'>
                                                <Link
                                                    href='/dash'
                                                    className='flex items-center gap-2'
                                                    onClick={() =>
                                                        handleCick("client")
                                                    }
                                                >
                                                    <NoUserAvatar
                                                        username={
                                                            entity?.name as string
                                                        }
                                                        variante='sm'
                                                    />
                                                    Entrar como cliente
                                                </Link>
                                            </li>
                                        )}
                                        {logged_as === "client" && (
                                            <li className='py-2 border-b border-gray-200 w-full'>
                                                <Link
                                                    href='/dash'
                                                    className='flex items-center gap-2'
                                                    onClick={() =>
                                                        handleCick("freelancer")
                                                    }
                                                >
                                                    <NoUserAvatar
                                                        username={
                                                            entity?.name as string
                                                        }
                                                        variante='sm'
                                                    />
                                                    Entrar como freelancer
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <Button
                            onClick={handleSignout}
                            className='bg-blue-600 text-white  hover:bg-blue-700 w-full'
                        >
                            Sign out
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
