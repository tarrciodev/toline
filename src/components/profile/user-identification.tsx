"use client";
import { updateFreelancerIdentification } from "@/actions/freelancer/update-freelancer-identification";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { UploadImagePreview } from "./upload-image-preview";

export default function UserIdentification({ userId }: { userId: string }) {
    const [BIFront, setBIFront] = useState<File | null>(null);
    const [BIBack, setBIBack] = useState<File | null>(null);
    const [displayIdentificationBox, setDisplayIdentificationBox] =
        useState(false);

    const [isSubmitting, startTransition] = useTransition();

    function toggleDisplayIdentificationBox() {
        setDisplayIdentificationBox((prev) => !prev);
    }

    async function handleUpdateUserIdentification() {
        startTransition(async () => {
            const response = await updateFreelancerIdentification({
                userId,
                BIFront,
                BIBack,
            });

            if (response.status === "success") {
                toast.success(response.message);
                return;
            }

            toast.error(response.message);
        });
    }

    return (
        <div className='bg-white flex p-4 rounded shadow-xl flex-col'>
            <div className='flex w-full justify-between'>
                <div className='flex flex-col flex-1'>
                    <span className='font-semibold text-lg'>Identificação</span>
                </div>
                <span
                    className='cursor-pointer'
                    onClick={toggleDisplayIdentificationBox}
                >
                    <Pencil className='size-5' />
                </span>
            </div>
            {displayIdentificationBox || (
                <div>
                    <p className='text-red-500 text-sm'>
                        Você ainda não adicionou o seu cartão de identificação
                    </p>
                </div>
            )}
            {displayIdentificationBox && (
                <div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col sm:flex-row gap-5'>
                            <UploadImagePreview
                                setState={setBIFront}
                                type='BIFront'
                            />
                            <UploadImagePreview
                                setState={setBIBack}
                                type='BIBack'
                            />
                        </div>
                        <div className='flex items-center gap-1 py-2 self-start'>
                            <Button
                                type='button'
                                size='sm'
                                className='flex flex-1 bg-red-700 hover:bg-red-600'
                            >
                                Cancelar
                            </Button>
                            <Button
                                className='flex flex-1'
                                disabled={isSubmitting}
                                size='sm'
                                onClick={handleUpdateUserIdentification}
                            >
                                {isSubmitting && <Loader />}
                                Salvar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
