"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ShowCaseProps } from "@/store/entity";
import { Plus } from "lucide-react";
import { AddShowCaseForm } from "../forms/add-portifolio-form";
import { ShowCase } from "./show-case";

export function ProjectsIHaveWorkedOn({
    entityId,
    showCases,
}: {
    entityId: string;
    showCases?: ShowCaseProps[];
}) {
    return (
        <div className='bg-white shadow-sm'>
            <div className='flex justify-between p-4 font-semibold text-lg'>
                <p>Portifolio</p>
                <Dialog>
                    <DialogTrigger>
                        <span className='text-sm sm:text-base flex items-center gap-1 bg-gray-200 rounded-lg px-2'>
                            adicionar <Plus className='size-4 sm:size-5' />
                        </span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicione um projeto</DialogTitle>
                        </DialogHeader>
                        <AddShowCaseForm entityId={entityId} />
                    </DialogContent>
                </Dialog>
            </div>
            {showCases?.length != 0 ? (
                <div className='grid grid-cols-3 gap-2 p-4'>
                    {showCases?.map((showCase) => (
                        <ShowCase showCase={showCase} key={showCase.id} />
                    ))}
                </div>
            ) : (
                <p className='px-4 text-sm text-red-500 py-2'>
                    Ainda não possui nenhum projeto
                </p>
            )}
        </div>
    );
}
