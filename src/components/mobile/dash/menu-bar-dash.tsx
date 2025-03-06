import { handleSignout } from "@/actions/users/signout";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MenuBarDash() {
    return (
        <div className='flex sm:hidden'>
            <Drawer>
                <DrawerTrigger asChild>
                    <span>
                        <Menu />
                    </span>
                </DrawerTrigger>
                <DrawerContent className='px-8 pb-10'>
                    <DrawerHeader>
                        <DrawerTitle>Dashboard</DrawerTitle>
                    </DrawerHeader>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <div>
                                <p className='font-semibold text-xl py-1'>
                                    Geral
                                </p>
                                <nav>
                                    <ul className='flex flex-col space-x-6'>
                                        <li className='py-2 border-y border-gray-200 w-full'>
                                            <Link
                                                href='/dash/projects'
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Projects
                                            </Link>
                                        </li>
                                        <li className='py-2 border-b border-gray-200 w-full'>
                                            <Link
                                                href='/dash/freelancers'
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Freelancers
                                            </Link>
                                        </li>
                                        <li className='py-2 border-b border-gray-200 w-full'>
                                            <a
                                                href='/blog'
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Blog
                                            </a>
                                        </li>
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
                                                href='/dash/projects'
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Meus Projectos
                                            </Link>
                                        </li>
                                        <li className='py-2 border-b border-gray-200 w-full'>
                                            <Link
                                                href='/dash/freelancers'
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Meu Perfil
                                            </Link>
                                        </li>
                                        <li className='py-2 border-b border-gray-200 w-full'>
                                            <a
                                                href='/blog'
                                                className='text-gray-700 hover:text-blue-600'
                                            >
                                                Minha Conta
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <Button
                            onClick={handleSignout}
                            className='bg-blue-600 text-white  hover:bg-blue-700'
                        >
                            Sign out
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
