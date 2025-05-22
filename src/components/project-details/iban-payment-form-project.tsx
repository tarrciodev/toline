"use client";
import { AccountDetails } from "@/app/dash/client/finances/(components)/account-details";
import { useIbanPaymentService } from "@/services/payments/iban-payment-service";
import { CustomFormField } from "../custom-form-field";
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

export default function IbanPaymentFormProject({
    triggerRef,
    projectId,
}: {
    triggerRef?: React.RefObject<HTMLDivElement | null>;
    projectId: string;
}) {
    const { form, isSubmitting, handleSubmit } = useIbanPaymentService({
        triggerRef,
        projectId,
    });
    return (
        <div className='mb-6'>
            <AccountDetails />
            <Form {...form}>
                <form
                    className='flex flex-col gap-2'
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <CustomFormField
                        control={form.control}
                        name='ammount'
                        label='Valor a Acrescentar'
                    >
                        <Input />
                    </CustomFormField>
                    <CustomFormField
                        control={form.control}
                        name='referenceNumber'
                        label='Número de Referencia'
                    >
                        <Input />
                    </CustomFormField>
                    <FormField
                        control={form.control}
                        name='file'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    <Input
                                        type='file'
                                        onChange={(e) => {
                                            const file = e.target.files
                                                ? e.target.files[0]
                                                : null;
                                            field.onChange(file);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex gap-2'>
                        <Button
                            type='submit'
                            className='flex-1'
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader />}Realizar Pagamento
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
