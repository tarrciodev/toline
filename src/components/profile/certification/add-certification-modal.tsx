"use client";
import { addFreelancerCertification } from "@/actions/freelancer/add-freelancer-certification";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { ReactNode, useActionState, useState } from "react";

export function AddCertificationModal({ children }: { children: ReactNode }) {
    const [file, setFile] = useState<File | null>(null);
    console.log(file);
    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setFile(file);
    }

    const [state, formAction, isPending] = useActionState(
        addFreelancerCertification,
        null
    );

    console.log(state);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicione uma Certificação</DialogTitle>
                </DialogHeader>
                <form action={formAction} className='flex flex-col gap-2'>
                    <div className='relative border border-gray-400 p-2 rounded flex items-center justify-center  cursor-pointer'>
                        <input
                            type='file'
                            name='file'
                            className='absolute opacity-0 z-10 w-full h-full cursor-pointer'
                            onChange={handleUpload}
                        />
                        <Plus />
                        <span className='flex items-center justify-center text-sm'>
                            {file ? file.name : "selecione um arquivo"}
                        </span>
                    </div>
                    <Input
                        type='text'
                        name='certificationName'
                        placeholder='Nome da Certificação'
                        className='py-2 border border-gray-400'
                    />
                    <Button type='submit' disabled={isPending}>
                        {isPending && <Loader />} Adicionar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
