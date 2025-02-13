"use client";
import { ShowCaseProps } from "@/actions/users/get-entity";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AddShowCaseForm } from "../forms/add-projects-form";
import { ShowCase } from "./show-case";

export function ProjectsIHaveWorkedOn({
    entityId,
    showCases,
}: {
    entityId: string;
    showCases?: ShowCaseProps[];
}) {
    return (
        <div className='bg-white shadow'>
            <div className='grid grid-cols-3 gap-2 p-4'>
                {showCases?.map((showCase) => (
                    <ShowCase showCase={showCase} key={showCase.id} />
                ))}
            </div>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicione um projeto</DialogTitle>
                    </DialogHeader>
                    <AddShowCaseForm entityId={entityId} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
