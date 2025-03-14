import { auth } from "@/auth";
import { DoorOpen } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";
import { MenuBar } from "./mobile/menu-bar";

export async function Header() {
    const data = ((await auth()) as { user: { email: string } }) ?? null;

    return (
        <header className='bg-white shadow-sm sticky top-0 z-50 overflow-hidden h-16 px-4 sm:px-56'>
            <div className='flex justify-between items-center'>
                <Logo redirectTo='/' />
                <nav className='flex gap-6'>
                    <Link href='/about' prefetch>
                        About
                    </Link>

                    <Link
                        href='/blog'
                        className='text-gray-700 hover:text-blue-600'
                        prefetch
                    >
                        blog
                    </Link>
                </nav>
                <div className='hidden sm:flex gap-2 items-center'>
                    {data?.user?.email ? (
                        <Link href='/dash' prefetch>
                            <span className='flex justify-center items-center gap-2 bg-blue-800 text-blue-50 font-semibold rounded-xl px-4 py-2'>
                                dashboard <DoorOpen />
                            </span>
                        </Link>
                    ) : (
                        <>
                            <Link href='/login' prefetch>
                                Sign in
                            </Link>
                            <Link
                                href='/register'
                                prefetch
                                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
                <MenuBar />
            </div>
        </header>
    );
}
