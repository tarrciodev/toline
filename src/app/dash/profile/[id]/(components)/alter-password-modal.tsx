"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, X } from "lucide-react";
import { useRef } from "react";
import { ChangePasswordForm } from "./change-password-form";
export function AlterPasswordModal() {
    const triggerRef = useRef<HTMLSpanElement | null>(null);
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span
                    className='flex gap-2 justify-center cursor-pointer'
                    ref={triggerRef}
                >
                    Altear Senha <Pencil className='size-4' />
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <div className='relative'>
                    <span
                        className='absolute -top-1 right-1 cursor-pointer'
                        onClick={() => triggerRef.current?.click()}
                    >
                        <X />
                    </span>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Altere a sua senha</AlertDialogTitle>
                    </AlertDialogHeader>
                    <ChangePasswordForm triggerRef={triggerRef} />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
