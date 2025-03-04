"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function FreelancerProjectsFilter({ status }: { status: string }) {
    const [activeStatus, setActiveStatus] = useState(status);

    return (
        <aside className='w-full sm:w-[20dvw]'>
            <div className='flex flex-col sm:gap-2'>
                <p className='text-xl font-semibold my-2'>Filtros</p>
                <div className='flex w-full gap-2 overflow-x-auto whitespace-nowrap scrollbar-none scrollbar-none hide-scrollbar sm:flex-col'>
                    <Link
                        href='/dash/freelancer/proposals?status=sent'
                        onClick={() => setActiveStatus("sent")}
                        className={cn(
                            "bg-white py-1 px-3 rounded-xl sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none text-sm sm:text-base items-center justify-center",
                            activeStatus == "sent" &&
                                "text-blue-50 sm:text-blue-600 bg-blue-600 "
                        )}
                    >
                        Propostas Enviadas
                    </Link>
                    <Link
                        href='/dash/freelancer/proposals?status=accepted'
                        onClick={() => setActiveStatus("accepted")}
                        className={cn(
                            "bg-white py-1 px-3 rounded-xl sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none text-sm sm:text-base items-center justify-center",
                            activeStatus == "accepted" &&
                                "text-blue-50 sm:text-blue-600 bg-blue-600 "
                        )}
                    >
                        Propostas Aceitas
                    </Link>
                    <Link
                        href='/dash/freelancer/proposals?status=concluded'
                        onClick={() => setActiveStatus("concluded")}
                        className={cn(
                            "bg-white py-1 px-3 rounded-xl sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none text-sm sm:text-base items-center justify-center",
                            activeStatus == "concluded" &&
                                "text-blue-50 sm:text-blue-600 bg-blue-600 "
                        )}
                    >
                        Projetos Concluídos
                    </Link>
                </div>
            </div>
        </aside>
    );
}
