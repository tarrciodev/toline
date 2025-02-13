"use client";

import { unsubscribeOnProject } from "@/actions/projects/unsubscribe-on-project";
import { Loader } from "@/components/loader";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useRef, useTransition } from "react";

export function UnsubscribeToProject({
    projectId,
    freelancerId,
}: {
    projectId: string;
    freelancerId: string;
}) {
    const [isPending, startTransition] = useTransition();

    const closeRef = useRef<HTMLSpanElement | null>(null);

    function handleUnsubscribe() {
        startTransition(async () => {
            const response = await unsubscribeOnProject(
                projectId,
                freelancerId
            );
            if (response.status === "success") {
                closeRef.current?.click();
            }
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className='w-full'>
                <div className='flex justify-center bg-red-700 hover:bg-red-600 text-red-50 w-full py-2 rounded-lg cursor-pointer'>
                    Cancelar Proposta
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem a certeza que deseja cancelar a proposta?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild className='cursor-pointer'>
                        <span ref={closeRef}>Não</span>
                    </AlertDialogCancel>
                    <div>
                        <Button
                            onClick={handleUnsubscribe}
                            disabled={isPending}
                            type='submit'
                            className='w-full'
                        >
                            {isPending && <Loader />} sim
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
