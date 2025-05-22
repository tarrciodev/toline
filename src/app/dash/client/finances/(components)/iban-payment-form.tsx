"use client";
import { CustomFormField } from "@/components/custom-form-field";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIbanPaymentService } from "@/services/finances/use-iban-payment-service";
import { AccountDetails } from "./account-details";

export function IbanPaymentForm({
    triggerRef,
}: {
    triggerRef?: React.RefObject<HTMLDivElement | null>;
}) {
    const { form, isSubmitting, handleCloseModal, handleSubmit } =
        useIbanPaymentService(triggerRef);
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
                            type='button'
                            variant='destructive'
                            onClick={handleCloseModal}
                            className='flex-1'
                        >
                            Cancelar
                        </Button>
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
