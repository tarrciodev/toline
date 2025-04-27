"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

// Validação Zod específica para o Step1
export const step1ValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .regex(
            /^([A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+){1,5})$/,
            "Digite um nome válido com 2 a 6 palavras"
        ),
    email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export function Step1() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useFormContext();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <div className='grid gap-4'>
            <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Seu Nome</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Digite seu nome completo'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder='Digite seu email' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                    <FormItem className='relative'>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder='Digite sua senha'
                                {...field}
                            />
                        </FormControl>
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
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
