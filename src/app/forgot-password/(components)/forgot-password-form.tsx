"use client";

import { CustomFormField } from "@/components/custom-form-field";
import { FormMessage } from "@/components/form-message";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordService } from "@/services/account/forgot-password-service";

export default function ForgotPasswordForm() {
    const { form, handleSubmit, forgotMessage, isSubmitting } =
        useForgotPasswordService();
    return (
        <div>
            {forgotMessage.message && (
                <FormMessage
                    message={forgotMessage.message}
                    className={
                        forgotMessage.status === "error"
                            ? "text-destructive"
                            : "text-green-600"
                    }
                />
            )}
            <Form {...form}>
                <form
                    className='space-y-4 mt-5'
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <CustomFormField
                        control={form.control}
                        name='email'
                        label='email'
                    >
                        <Input placeholder='Informe o seu email' />
                    </CustomFormField>
                    <Button
                        className='w-full bg-blue-600 hover:bg-blue-700'
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader />}
                        Continuar
                    </Button>
                </form>
            </Form>
        </div>
    );
}
