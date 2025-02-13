"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export function AcountHeader() {
    const pathname = usePathname();
    const isRegisterRoute = pathname.includes("/register");

    return (
        <header className='bg-white shadow sticky top-0 z-50 overflow-hidden h-16 px-56 flex items-center'>
            <div className='py-4 flex flex-1 justify-between items-center'>
                <Logo redirectTo='/' />
                <nav>
                    {isRegisterRoute ? (
                        <ul className='flex gap-2'>
                            <li>Já tem uma conta?</li>{" "}
                            <Link href='/login' className='text-blue-600'>
                                Faça o Login
                            </Link>
                        </ul>
                    ) : (
                        <ul className='flex gap-2'>
                            <li>Não tem uma conta?</li>{" "}
                            <Link href='/register' className='text-blue-600'>
                                Registe-se
                            </Link>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
}
