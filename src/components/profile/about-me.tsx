"use client";
import { updateUserBio } from "@/actions/users/update-bio";
import { getCookieStore } from "@/utils/cookie-store";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function AboutMe({ userId, bio }: { userId: string; bio: string }) {
    const [displayTextBox, setDisplayTextBox] = useState(false);
    const { data: logged_as } = useQuery({
        queryKey: ["logged_as"],
        queryFn: async () => {
            const data = getCookieStore("logged_as");
            return data;
        },
    });

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
                        <Pencil className='size-4 sm:size-5' />
                    </span>
                </div>
            )}

            {displayTextBox && (
                <form action={formAction}>
                    <Textarea
                        name='bio'
                        placeholder='Nos fale um poquinho sobre você'
                        className='h-32'
                        defaultValue={bio}
                    />
                    <input type='hidden' name='userId' value={userId} />
                    <input type='hidden' name='logged_as' value={logged_as} />

                    <div className='w-full p-4 flex justify-end gap-2'>
                        <Button
                            className='bg-red-700 hover:bg-red-800'
                            type='button'
                            onClick={toogleDisplayTextBox}
                        >
                            Cancelar
                        </Button>
                        <Button disabled={isPending} type='submit'>
                            {isPending && <Loader />} Salvar
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
