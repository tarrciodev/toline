"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function FreelancerProjectsFilter({ status }: { status: string }) {
    const [activeStatus, setActiveStatus] = useState(status);
    return (
        <aside className='w-[20dvw]'>
            <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold my-2'>Filtros</p>
                <Link
                    href='/dash/freelancer/proposals?status=sent'
                    onClick={() => setActiveStatus("sent")}
                    className={cn(activeStatus == "sent" && "text-blue-500")}
                >
                    Propostas Enviadas
                </Link>
                <Link
                    href='/dash/freelancer/proposals?status=accepted'
                    onClick={() => setActiveStatus("accepted")}
                    className={cn(
                        activeStatus == "accepted" && "text-blue-500"
                    )}
                >
                    Propostas Aceitas
                </Link>
                <Link
                    href='/dash/freelancer/proposals?status=concluded'
                    onClick={() => setActiveStatus("concluded")}
                    className={cn(
                        activeStatus == "concluded" && "text-blue-500"
                    )}
                >
                    Projetos Concluídos
                </Link>
            </div>
        </aside>
    );
}
