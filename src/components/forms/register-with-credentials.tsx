"use client";
import { registerWithCredentials } from "@/actions/users/register-with-credentials";
import { FormMessage as EmailMessageError } from "@/components/form-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader } from "../loader";
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

export const registerWithCredentialsSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    name: z.string(),
    password: z.string().min(8, "Password deve ter pelo menos 8 caracteres"),
});

export type registerWithCredentialProps = z.infer<
    typeof registerWithCredentialsSchema
>;

export function RegisterWithCredentialsForm() {
    const pathname = usePathname().split("/").pop() as string;

    const form = useForm<registerWithCredentialProps>({
        resolver: zodResolver(registerWithCredentialsSchema),
        defaultValues: {
            email: "", // Ensure these fields are initialized
            password: "",
            name: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const [displayFormMessage, setDisplayFormMessage] = useState(false);

    async function submitForm(data: registerWithCredentialProps) {
        const register = await registerWithCredentials(data, pathname);

        if (register?.status == "error") {
            setDisplayFormMessage(true);
            return;
        }

        toast.success("Conta criada com sucesso");

        setTimeout(() => {
            redirect("/dash");
        }, 2000);
    }

    return (
        <Form {...form}>
            {displayFormMessage && (
                <EmailMessageError message='Essa conta já existe' />
            )}
            <form
                className='grid gap-6'
                onSubmit={form.handleSubmit(submitForm)}
            >
                <div className='grid gap-2'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Seu Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Digite seu Nome'
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
                    {isSubmitting && <Loader />} Registar
                </Button>
            </form>
        </Form>
    );
}
