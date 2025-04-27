"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function Step2() {
    const form = useFormContext(); // acessa contexto do formulário

    return (
        <div className='grid gap-4'>
            <FormField
                control={form.control}
                name='code'
                rules={{ required: "O código de verificação é obrigatório" }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Código de Verificação</FormLabel>
                        <FormControl>
                            <Input
                                placeholder='Digite o código enviado por e-mail'
                                maxLength={6}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
