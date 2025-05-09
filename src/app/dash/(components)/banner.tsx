"use client";
import { IBanner } from "@/actions/banner";
import { useTimeLeft } from "@/services/banner";
import Link from "next/link";
import { useEffect, useState } from "react";

export function WorkshopBanner({ banner }: { banner: IBanner }) {
    const { timeLeft, formatNumber } = useTimeLeft(
        new Date(banner.avaialbleAt)
    );

    const [shouldDisplay, setShouldDisplay] = useState(false);

    useEffect(() => {
        const checkDisplayPeriod = () => {
            const now = new Date();
            const availableDate = new Date(banner.avaialbleAt);

            const startDisplay = new Date(availableDate);
            startDisplay.setDate(availableDate.getDate() - 2);

            const endDisplay = new Date(availableDate);
            endDisplay.setDate(availableDate.getDate() + 3);

            const isWithinDisplayPeriod =
                now >= startDisplay && now <= endDisplay;

            setShouldDisplay(isWithinDisplayPeriod);
        };

        checkDisplayPeriod();

        const intervalId = setInterval(checkDisplayPeriod, 3600000);

        return () => clearInterval(intervalId);
    }, [banner.avaialbleAt]);

    if (!shouldDisplay) {
        return null;
    }

    return (
        <div className='w-full mb-6 mt-4'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden relative'>
                <div className='absolute inset-0 bg-indigo-900 z-10'>
                    <div className="absolute inset-0 opacity-90 bg-[url('/patterns/grid.svg')]"></div>

                    <div className='absolute top-0 right-0 w-1/3 h-full bg-white transform skew-x-12 translate-x-20 hidden md:block'></div>
                </div>

                <div className='relative z-20 p-4'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                        <div className='text-white mb-6 md:mb-0 md:mr-4 md:flex-1'>
                            <div className='inline-block bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2'>
                                Workshop Gravado
                            </div>
                            <h3 className='text-xl font-bold'>
                                Workshop Exclusivo: {banner.title}
                            </h3>
                            <p className='py-2 max-w-full md:max-w-[50vw]'>
                                {banner.description}
                            </p>
                            <p className='text-sm text-blue-50 font-semibold'>
                                Com Prof. Carlos Santos
                            </p>
                            <div className='my-4 md:my-2'>
                                <Link
                                    href={banner.url}
                                    target='_blank'
                                    className='bg-white text-indigo-900 hover:bg-indigo-50 py-2 px-4 rounded-lg font-medium transition-colors duration-200'
                                >
                                    Aceder ao Workshop
                                </Link>
                            </div>
                        </div>

                        <div className='flex md:gap-2 md:justify-end'>
                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-full md:w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.days)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Dias
                                </div>
                            </div>

                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-full md:w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.hours)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Horas
                                </div>
                            </div>

                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-full md:w-16'>
                                <div className='text-white font-bold text-lg'>
                                    {formatNumber(timeLeft.minutes)}
                                </div>
                                <div className='text-xs text-indigo-100'>
                                    Min
                                </div>
                            </div>

                            <div className='bg-indigo-900 backdrop-blur-sm rounded px-3 py-2 text-center w-full md:w-16'>
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
