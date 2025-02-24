"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { MenuBar } from "./mobile/menu-bar";

export function Header() {
    return (
        <header className='bg-white shadow-sm sticky top-0 z-50 overflow-hidden h-16 px-4 sm:px-56'>
            <div className='flex justify-between items-center'>
                <Logo redirectTo='/' />
                <nav>
                    <ul className='flex space-x-6'>
                        <li>
                            <a
                                href='#about'
                                className='text-gray-700 hover:text-blue-600'
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <Link
                                href='/blog'
                                className='text-gray-700 hover:text-blue-600'
                                prefetch
                            >
                                blog
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link href='/login'>Sign in</Link>
                    <Link
                        href='/register'
                        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    >
                        Sign up
                    </Link>
                </div>
                <MenuBar />
            </div>
        </header>
    );
}
