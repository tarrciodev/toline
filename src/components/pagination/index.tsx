"use client";

import { usePaginationService } from "@/services/pagination";
import { useQuerySetter } from "@/utils/query-state";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import { PaginationItem } from "./pagination-item";

interface IPaginationControll {
    totalResult: number;
    isFixed?: boolean;
}

export function PaginationControll({ totalResult }: IPaginationControll) {
    const { searchParams } = useQuerySetter();
    const page = Number(searchParams.get("page"));

    const { goToFirstPage, goToLastPage, goToNextPage, goToPreviousPage } =
        usePaginationService({ page, take: 8, totalResult });

    const totalNumberOfPages = Math.ceil(totalResult / 8);
    const hasNextPage = page + 1 <= totalNumberOfPages;
    const hasPreviousPage = page - 1 >= 1;
    return (
        <div className='flex justify-end items-center sm:w-full'>
            <div className='flex gap-4  border sm:border-gray-400 py-2 px-3 sm:px-6 rounded'>
                <div className='hidden sm:flex text-sm flex-1'>
                    Pagina {page} de {Math.ceil(totalResult / 8)}
                </div>
                <div className='flex sm:hidden text-sm flex-1'>Paginação</div>
                <div className='flex gap-1'>
                    <PaginationItem
                        onClick={goToFirstPage}
                        disabled={!hasPreviousPage}
                    >
                        <ChevronsLeft />
                    </PaginationItem>
                    <PaginationItem
                        onClick={goToPreviousPage}
                        disabled={!hasPreviousPage}
                    >
                        <ChevronLeft />
                    </PaginationItem>
                    <PaginationItem
                        onClick={goToNextPage}
                        disabled={!hasNextPage}
                    >
                        <ChevronRight />
                    </PaginationItem>
                    <PaginationItem
                        onClick={goToLastPage}
                        disabled={!hasNextPage}
                    >
                        ultima
                    </PaginationItem>
                </div>
            </div>
        </div>
    );
}
