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
import { Banknote, Barcode, CreditCard } from "lucide-react";
import { RefObject } from "react";
import { AccountDetails } from "./account-details";

export function RechargeForm({
    triggerRef,
}: {
    triggerRef?: RefObject<HTMLDivElement | null>;
}) {
    const { form, isSubmitting, handleCloseModal, handleSubmit } =
        useIbanPaymentService(triggerRef);

    return (
        <div>
            <div className='mb-6'>
                <p className='text-sm font-medium text-gray-700 mb-2'>
                    Selecione o método de pagamento:
                </p>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center border rounded-md p-3 cursor-pointer'>
                        <div className='text-2xl mb-1'>
                            <Banknote />
                        </div>
                        <p className='text-sm'>IBAN</p>
                    </div>
                    <div className='flex flex-col items-center border rounded-md p-3 cursor-pointer opacity-10'>
                        <div className='text-2xl mb-1'>
                            <Barcode />
                        </div>
                        <p className='text-sm'>Referencia</p>
                    </div>
                    <div className='flex flex-col items-center justify-center border rounded-md p-3  cursor-pointer  opacity-10'>
                        <div className='text-2xl mb-1'>
                            <CreditCard />
                        </div>
                        <p className='text-sm'>VISA</p>
                    </div>
                </div>
            </div>
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
        </div>
    );
}
