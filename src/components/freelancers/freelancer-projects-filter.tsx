"use client";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

export function FreelancerProjectsFilter() {
    const [activeStatus, setActiveStatus] = useQueryState("status", {
        defaultValue: status,
        shallow: true, // Avoid full page reloads
    });

    const handleStatusChange = (newStatus: string) => {
        setActiveStatus(newStatus);
    };

    return (
        <aside className='w-full sm:w-[20dvw] bg-white sm:bg-transparent p-4 sm:p-0 fixed top-10 sm:sticky sm:top-20 '>
            <div className='flex flex-col sm:gap-2'>
                <p className='text-xl font-semibold my-2'>Filtros</p>
                <div className='flex w-full gap-2 overflow-x-auto whitespace-nowrap scrollbar-none hide-scrollbar sm:flex-col sm:items-start'>
                    <button
                        onClick={() => handleStatusChange("sent")}
                        className={cn(
                            "bg-white py-1 px-3 rounded-xl sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none text-sm sm:text-base items-center justify-center",
                            activeStatus === "sent" &&
                                "text-blue-50 sm:text-blue-600 bg-blue-600"
                        )}
                    >
                        Propostas Enviadas
                    </button>
                    <button
                        onClick={() => handleStatusChange("accepted")}
                        className={cn(
                            "bg-white py-1 px-3 rounded-xl sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none text-sm sm:text-base items-center justify-center",
                            activeStatus === "accepted" &&
                                "text-blue-50 sm:text-blue-600 bg-blue-600"
                        )}
                    >
                        Propostas Aceitas
                    </button>
                    <button
                        onClick={() => handleStatusChange("concluded")}
                        className={cn(
                            "bg-white py-1 px-3 rounded-xl sm:bg-transparent sm:py-0 sm:px-0 sm:rounded-none text-sm sm:text-base items-center justify-center",
                            activeStatus === "concluded" &&
                                "text-blue-50 sm:text-blue-600 bg-blue-600"
                        )}
                    >
                        Projetos Concluídos
                    </button>
                </div>
            </div>
        </aside>
    );
}
