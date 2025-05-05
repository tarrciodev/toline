"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cloneElement, useRef } from "react";

export function RechargeButton({
    children,
}: {
    children: React.ReactElement<{
        triggerRef?: React.Ref<HTMLDivElement | null>;
    }>;
}) {
    const triggerRef = useRef<HTMLDivElement | null>(null);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div
                    ref={triggerRef}
                    className='py-2 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-blue-50 cursor-pointer'
                >
                    Recarregar Saldo
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
