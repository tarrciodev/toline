"use client";

import { loginWithCredentials } from "@/actions/users/login-with-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const loginWithEmailSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z.string().min(8, "Password deve ter pelo menos 8 caracteres"),
});

export type loginWithEmailProps = z.infer<typeof loginWithEmailSchema>;

export default function LoginWithCredentials() {
    const [showPassword, setShowPassword] = useState(false);
    function handleShowPassword() {
        setShowPassword((prev) => !prev);
    }
    const form = useForm<loginWithEmailProps>({
        resolver: zodResolver(loginWithEmailSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function submitForm(data: loginWithEmailProps) {
        const login = await loginWithCredentials(data);
        if (login?.status == "error") {
            toast.error(login.message);
            return;
        }

        redirect("/dash");
    }

    return (
        <Form {...form}>
            <form
                className='grid gap-6'
                onSubmit={form.handleSubmit(submitForm)}
            >
                <div className='grid gap-2'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Digite seu email'
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
                        name='password'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder='Digite sua senha tarcio'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                <span
                                    onClick={handleShowPassword}
                                    className='absolute right-3 top-9 cursor-pointer'
                                >
                                    {showPassword ? (
                                        <EyeClosed size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </span>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type='submit'
                    className='w-full bg-blue-600 hover:bg-blue-700'
                    disabled={form.formState.isSubmitting}
                >
                    Login
                </Button>
            </form>
        </Form>
    );
}
