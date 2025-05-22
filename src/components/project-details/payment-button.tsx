"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cloneElement, useRef } from "react";

export function PaymentButton({
    children,
}: {
    children: React.ReactElement<{
        triggerRef?: React.Ref<HTMLDivElement | null>;
        projectId: string;
    }>;
}) {
    const triggerRef = useRef<HTMLDivElement | null>(null);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div
                    ref={triggerRef}
                    className='flex justify-center my-1 py-2 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-blue-50 cursor-pointer'
                >
                    Fazer pagamento
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Carrege o Seu Saldo</AlertDialogTitle>
                </AlertDialogHeader>
                {cloneElement(children, { triggerRef })}
            </AlertDialogContent>
        </AlertDialog>
    );
}
