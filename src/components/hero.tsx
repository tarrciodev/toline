"use client";
import Link from "next/link";
import { OrbitingUsers } from "./orbiting-circle";

export function Hero() {
    return (
        <section className='bg-white  py-8 sm:py-16  flex px-4 sm:px-56 gap-10'>
            <div>
                <p className='text-2xl sm:text-4xl font-extrabold text-blue-700 sm:max-w-[50vw] text-left'>
                    Bem-vindo à TOLINE, Onde O Trabalho Não Tem Endereço, Só
                    Resultados..
                </p>

                <div className='mt-4 text-4xl'>
                    <p></p>
                    <p></p>
                </div>
                <div className='my-3 text-2xl sm:max-w-[45vw] font-light text-black/80'>
                    <p>
                        Sua plataforma completa para colaboração remota.
                        Conecte-se, gerencie projetos e seja produtivo de
                        qualquer lugar. Liberte-se das fronteiras e trabalhe do
                        seu jeito.
                    </p>
                </div>
                <div className='flex gap-2 pt-6'>
                    <Link
                        href='/register/client'
                        className='py-3 px-4 rounded-lg bg-blue-800 hover:bg-blue-700 text-blue-50 cursor-pointer'
                    >
                        Quero Contratar
                    </Link>
                    <Link
                        href='/register/freelancer'
                        className='py-3 px-4 rounded-lg cursor-pointer bg-transparent hover:bg-blue-100 text-blue-700 border border-blue-700'
                    >
                        Quero Trabalhar
                    </Link>
                </div>
            </div>
            <OrbitingUsers />
        </section>
    );
}
