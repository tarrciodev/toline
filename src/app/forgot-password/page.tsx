"use client";
import { forgotPassword } from "@/actions/users/forgot-password";
import { FormMessage } from "@/components/form-message";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

export default function ForgotPassword() {
    const [result, setResult] = useState({ status: "", message: "" });
    const [state, formAction, isPending] = useActionState(forgotPassword, null);
    useEffect(() => {
        if (state) {
            setResult({ status: state!.status, message: state!.message });
            setTimeout(() => {
                setResult({ status: "", message: "" });
            }, 2000);
        }
    }, [state]);
    return (
        <div className='h-screen bg-gray-200'>
            <Header />
            <div className='flex flex-1 justify-center pt-4'>
                <Card className='w-[30vw]  p-8'>
                    <CardTitle className='py-8'>Recuperação de Senha</CardTitle>
                    {result?.status == "error" && (
                        <FormMessage message={result.message} />
                    )}
                    <form className='space-y-4 mb-5' action={formAction}>
                        <Input placeholder='informe o seu email' name='email' />
                        <Button
                            className='w-full bg-blue-600 hover:bg-blue-700'
                            type='submit'
                            disabled={isPending}
                        >
                            Continuar
                        </Button>
                    </form>
                    <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                        <Link
                            href='/login'
                            className='relative z-10 bg-background px-2 text-muted-foreground'
                        >
                            Ou volte para login
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
