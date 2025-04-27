"use client";
import { updateUserBio } from "@/actions/users/update-bio";
import { Pencil } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function AboutMe({ userId }: { userId: string }) {
    const [displayTextBox, setDisplayTextBox] = useState(false);
    function toogleDisplayTextBox() {
        setDisplayTextBox((prev) => !prev);
    }

    const [state, formAction, isPending] = useActionState(updateUserBio, null);

    useEffect(() => {
        if (state?.status === "success") {
            setDisplayTextBox(false);
        }
    }, [state]);

    return (
        <div className='bg-white p-4 rounded shadow-xl'>
            {displayTextBox || (
                <div className='flex justify-between'>
                    <span className='font-semibold text-lg'>Sobre Mim</span>
                    <span
                        className='cursor-pointer'
                        onClick={toogleDisplayTextBox}
                    >
                        <Pencil className='size-5' />
                    </span>
                </div>
            )}

            {displayTextBox && (
                <form action={formAction}>
                    <Textarea
                        name='bio'
                        placeholder='Nos fale um poquinho sobre você'
                        className='h-32'
                    />
                    <input type='hidden' name='userId' value={userId} />

                    <div className='w-full p-4 flex justify-end gap-2'>
                        <Button
                            className='bg-red-700 hover:bg-red-800'
                            type='button'
                            onClick={toogleDisplayTextBox}
                        >
                            Cancelar
                        </Button>
                        <Button disabled={isPending}>
                            {isPending && <Loader />} Salvar
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
