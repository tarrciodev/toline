"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";

import { useUpdateProjectDueDateService } from "@/services/projects/update-project-due-date-service";
import { Edit2 } from "lucide-react";
import { Loader } from "../loader";
import { EditProjectDatePicker } from "./date-picker";

export type Dependencies = {
    projectId: string;
    ownerId: string;
};

export function EditProjectDueDateButton({
    dependencies,
}: {
    dependencies: Dependencies;
}) {
    const { form, isSubmitting, handleSubmit, triggerRef } =
        useUpdateProjectDueDateService(dependencies);

    return (
        <Dialog>
            <DialogTrigger>
                <div ref={triggerRef} className='w-[2.5vw] flex justify-end'>
                    <Edit2 />
                </div>
            </DialogTrigger>
            <DialogContent className='px-12'>
                <DialogHeader>
                    <DialogTitle>Atualizar Projeto</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className='flex flex-col gap-3'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <EditProjectDatePicker control={form.control} />
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting && <Loader />} Salvar
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
