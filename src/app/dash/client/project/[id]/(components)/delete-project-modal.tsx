"use client";
import { deleteProject } from "@/actions/projects/delete-project";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
    ResponsiveModal,
    ResponsiveModalContent,
    ResponsiveModalDescription,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from "@/components/ui/extension/responsive-modal";
import { revalidateOnCliente } from "@/utils/revalidate-on-cliente";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export function DeleteProjectModal({
    ownerId,
    projectId,
}: {
    ownerId: string;
    projectId: string;
}) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const data = await deleteProject({
                projectId,
                ownerId,
            });

            if (data.status == "error") {
                return;
            }

            revalidateOnCliente("/dash/client/projects");

            redirect("/dash/client/projects");
        });
    }
    return (
        <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
                <span className='text-red-700'>
                    <Trash2 />
                </span>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent className=' w-[25vw]!'>
                <ResponsiveModalTitle>
                    Deseja realmente deletar este projeto?
                </ResponsiveModalTitle>
                <ResponsiveModalDescription>
                    Está ação não poderá ser desfeita
                </ResponsiveModalDescription>
                <div className='pt-8 flex justify-end gap-2'>
                    <Button variant='outline'>Cancelar</Button>
                    <Button disabled={isPending} onClick={handleDelete}>
                        {isPending && <Loader />}Deletar
                    </Button>
                </div>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
}
