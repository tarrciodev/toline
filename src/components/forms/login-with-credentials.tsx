"use client";

import { loginWithEmail } from "@/actions/users/login-with-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation"; // Import the redirect function from next/navigation
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
    const form = useForm<loginWithEmailProps>({
        resolver: zodResolver(loginWithEmailSchema),
        defaultValues: {
            email: "", // Ensure these fields are initialized
            password: "",
        },
    });

    async function submitForm(data: loginWithEmailProps) {
        const login = await loginWithEmail(data);
        if (login.status == "error") {
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
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='Digite sua senha'
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
                    Login
                </Button>
            </form>
        </Form>
    );
}
