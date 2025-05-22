import { useTolinePaymentService } from "@/services/payments/toline-payment-service";
import React from "react";
import { CustomFormField } from "../custom-form-field";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

export function TolinePaymentForm({
    triggerRef,
    projectId,
}: {
    triggerRef?: React.RefObject<HTMLDivElement | null>;
    projectId?: string;
}) {
    const { form, handleSubmit, isSubmitting } = useTolinePaymentService({
        triggerRef,
        projectId: projectId as string,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex flex-col gap-2 '
            >
                <CustomFormField
                    control={form.control}
                    name='ammount'
                    label='Valor a pagar'
                >
                    <Input type='number' />
                </CustomFormField>
                <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full'
                >
                    {isSubmitting && <Loader />}
                    Pagar
                </Button>
            </form>
        </Form>
    );
}
