"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useClientPaymentService } from "@/services/projects/client-payment-service";
import { Edit2 } from "lucide-react";
import { CustomFormField } from "../custom-form-field";
import { Loader } from "../loader";
import { EditProjectDatePicker } from "./date-picker";

export type PaymentDependencies = {
    projectId: string;
    ownerId: string;
};

export function EditProjectPaymentButton({
    paymentDependencies,
}: {
    paymentDependencies: PaymentDependencies;
}) {
    const { form, isSubmitting, handleSubmit, triggerRef } =
        useClientPaymentService(paymentDependencies);
    return (
        <Dialog>
            <DialogTrigger>
                <div ref={triggerRef} className='w-[2.5vw] flex justify-end'>
                    <Edit2 />
                </div>
            </DialogTrigger>
            <DialogContent className='px-12'>
                <DialogHeader>
                    <DialogTitle>Atualizar Projeto</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className='flex flex-col gap-3'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <div>
                            <CustomFormField
                                control={form.control}
                                name='ammount'
                                label='Valor a pagar'
                            >
                                <Input type='number' />
                            </CustomFormField>
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name='file'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Comprovativo de pagamento
                                        </FormLabel>
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
                        </div>
                        <EditProjectDatePicker control={form.control} />
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting && <Loader />} Salvar
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
