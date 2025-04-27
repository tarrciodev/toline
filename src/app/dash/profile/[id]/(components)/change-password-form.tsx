"use client";
import { alterUserPassword } from "@/actions/users/alter-user-password";
import { getMe, IMe } from "@/actions/users/get-me";
import { CustomFormField } from "@/components/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    oldPassword: z
        .string()
        .min(8, "Password deve ter pelo menos 8 caracteres")
        .optional(),
    password: z.string().min(8, "Password deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
});

type formProps = z.infer<typeof schema>;

export function ChangePasswordForm({
    triggerRef,
}: {
    triggerRef: React.RefObject<HTMLSpanElement | null>;
}) {
    const form = useForm<formProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { data } = useQuery<IMe>({
        queryKey: ["me"],
        queryFn: async () => {
            const me = await getMe();
            return me;
        },
    });

    async function handleSubmit(data: formProps) {
        const alter = await alterUserPassword({
            password: data.password,
            oldPassword: data.oldPassword,
        });
        if (alter.status === "success") {
            toast.success(alter.message);
            setTimeout(() => {
                triggerRef.current?.click();
            }, 3000);
        }

        toast.error(alter.message);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-4'
            >
                {data?.hasSettedPassword && (
                    <CustomFormField
                        control={form.control}
                        name='oldPassword'
                        label='Senha Atual'
                    >
                        <Input />
                    </CustomFormField>
                )}
                <CustomFormField
                    control={form.control}
                    name='password'
                    label='Nova Senha'
                >
                    <Input />
                </CustomFormField>
                <CustomFormField
                    control={form.control}
                    name='confirmPassword'
                    label='Confirme a senha'
                >
                    <Input />
                </CustomFormField>
                <div className='my-3'>
                    <Button type='submit' className='w-full'>
                        Alterar Senha
                    </Button>
                </div>
            </form>
        </Form>
    );
}
