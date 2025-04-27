"use client";
import { FormMessage as FormMessageError } from "@/components/form-message";
import { Loader } from "@/components/loader";
import { Form } from "@/components/ui/form";

import { CustomFormField } from "@/components/custom-form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordService } from "@/services/account/reset-password-service";

export function ResetPasswordForm() {
    const { form, handleSubmit, resetResult, isSubmitting } =
        useResetPasswordService();
    return (
        <Form {...form}>
            <form
                className='grid gap-6'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                {resetResult.status == "error" && (
                    <FormMessageError message={resetResult.message} />
                )}
                <div className='grid gap-2'>
                    <CustomFormField
                        control={form.control}
                        name='password'
                        label='Nova Senha'
                    >
                        <Input />
                    </CustomFormField>
                </div>
                <div className='grid gap-2 '>
                    <CustomFormField
                        control={form.control}
                        name='confirmPassword'
                        label='Confirme a senha'
                    >
                        <Input />
                    </CustomFormField>
                </div>
                <Button
                    type='submit'
                    className='w-full bg-blue-600 hover:bg-blue-700'
                    disabled={isSubmitting}
                >
                    {isSubmitting && <Loader />}
                    Continuar
                </Button>
            </form>
        </Form>
    );
}
