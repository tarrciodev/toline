"use client";
import { IBanner } from "@/actions/banner";
import { useTimeLeft } from "@/services/banner";
import Link from "next/link";

export function WorkshopBanner({ banner }: { banner: IBanner }) {
    const { timeLeft, formatNumber } = useTimeLeft(
        new Date(banner.avaialbleAt)
    );

    return (
        <div className='w-full mb-6 mt-4'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden relative'>
                {/* Substituindo o gradiente anterior por uma opção mais suave e profissional */}
                <div className='absolute inset-0 bg-indigo-900 z-10'>
                    {/* Overlay com padrão sutil */}
                    <div className="absolute inset-0 opacity-90 bg-[url('/patterns/grid.svg')]"></div>
                    {/* Destaque lateral com cor mais vibrante */}
                    <div className='absolute top-0 right-0 w-1/3 h-full bg-white  transform skew-x-12 translate-x-20'></div>
                </div>

                <div className='relative z-20 flex items-center justify-between p-4'>
                    <div className='flex flex-1 justify-between items-center'>
                        <div className='flex-1 text-white gap-2'>
                            <div className='inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2'>
                                Workshop Gravado
                            </div>
                            <h3 className='text-xl font-bold'>
                                Workshop Exclusivo: {banner.title}
                            </h3>
                            <p className='py-2 max-w-[50vw]'>
                                {banner.description}
                            </p>
                            <p className='text-sm text-blue-50 font-semibold'>
                                Com Prof. Carlos Santos
                            </p>
                            <div className='my-2'>
                                <Link
                                    href={banner.url}
                                    target='_blank'
                                    className='bg-white text-indigo-900 hover:bg-indigo-50 py-2 px-4 rounded-lg font-medium transition-colors duration-200'
                                >
                                    Aceder ao Workshop
                                </Link>
                            </div>
                        </div>
                        <div className='flex gap-2 mb-4 md:mb-0 justify-end'>
                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.days)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Dias
                                </div>
                            </div>

                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.hours)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Horas
                                </div>
                            </div>

                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.minutes)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Min
                                </div>
                            </div>

                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.seconds)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Seg
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
