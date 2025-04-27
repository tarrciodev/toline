"use client";
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
import { useDeleteTolinerAccountService } from "@/services/profile/dele-toliner-account-service";
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteAccountModal() {
    const { handleDeleteMyAccount } = useDeleteTolinerAccountService();
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const response = await handleDeleteMyAccount();
            if (response?.status === "error") {
                toast.success("Occoreu um erro, tente mais tarde!");
                return;
            }

            toast.success("Sua conta foi excluida com sucesso!");
            setTimeout(() => {
                redirect("/");
            }, 3000);
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className='flex gap-2 items-center justify-center cursor-pointer'>
                Excluir Conta <Trash className='size-4 text-red-700' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem a certeza que deseja excluir sua conta?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        A sua conta poderá ser recuperada, se fizer login com o
                        seu email dentro de 20 dias. Quando esse periodo passar
                        sua conta será excluida permanentemente sem qualquer
                        possibilidade de recupera-la.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button disabled={isPending} onClick={handleDelete}>
                        {" "}
                        {isPending && <Loader />}Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
