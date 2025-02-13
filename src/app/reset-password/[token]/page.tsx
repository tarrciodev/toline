"use client";
import { resetPassword } from "@/actions/users/reset-password";
import { FormMessage as FormMessageError } from "@/components/form-message";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password deve ter pelo menos 8 caracteres")
            .regex(
                /[A-Z]/,
                "Password deve conter pelo menos uma letra maiúscula"
            )
            .regex(
                /[a-z]/,
                "Password deve conter pelo menos uma letra minúscula"
            )
            .regex(/\d/, "Password deve conter pelo menos um número"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords devem combinar",
        path: ["confirmPassword"],
    });

export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;

export default function ResetPassword() {
    const form = useForm<ResetPasswordProps>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const [resetResult, setResetResult] = useState({ status: "", message: "" });

    const token = usePathname().split("/").pop() as string;

    async function handleSubmit(data: ResetPasswordProps) {
        const reset = await resetPassword({ ...data, token });
        setResetResult({ status: reset.status, message: reset.message });
        setTimeout(() => {
            setResetResult({ status: "", message: "" });
        }, 2000);
    }
    return (
        <div className='h-screen bg-gray-200'>
            <Header />
            <div className='flex flex-1 justify-center pt-4'>
                <Card className='w-[30vw]  p-8'>
                    <CardHeader className='px-0 font-semibold'>
                        Reset Password
                    </CardHeader>
                    <Form {...form}>
                        <form
                            className='grid gap-6'
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            {resetResult.status == "error" && (
                                <FormMessageError
                                    message={resetResult.message}
                                />
                            )}
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nova Senha</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=''
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirme a senha
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    placeholder=''
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type='submit'
                                className='w-full bg-blue-600 hover:bg-blue-700'
                                disabled={form.formState.isSubmitting}
                            >
                                Continuar
                            </Button>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
