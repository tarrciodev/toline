"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";

import { updateProjectQuotation } from "@/actions/projects/update-project-quotation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Edit2 } from "lucide-react";
import { z } from "zod";
import { Loader } from "../loader";
import { Textarea } from "../ui/textarea";

export const EditProjectFormSchema = z.object({
    ammount: z.string(),
    description: z.string().min(1),
});

export type EditProjectFormProps = z.infer<typeof EditProjectFormSchema>;

type QuotationDependencies = {
    projectId: string;
    quotationId: string;
    clientId: string;
};

export function EditProjectQoutationButton({
    quotationDependencies,
}: {
    quotationDependencies: QuotationDependencies;
}) {
    const form = useForm<EditProjectFormProps>({
        resolver: zodResolver(EditProjectFormSchema),
        defaultValues: {
            ammount: "",
            description: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: EditProjectFormProps) {
        const response = await updateProjectQuotation({
            formData: data,
            dependencies: {
                projectId: quotationDependencies.projectId,
                clientId: quotationDependencies.clientId,
                quotationId: quotationDependencies.quotationId as string,
            },
        });

        console.log(response);
    }
    return (
        <Dialog>
            <DialogTrigger>
                <div className='w-[2.5vw] flex justify-end'>
                    <Edit2 />
                </div>
            </DialogTrigger>
            <DialogContent className='px-12'>
                <DialogHeader>
                    <DialogTitle>Atualizar Projeto</DialogTitle>
                    <DialogDescription>
                        Ao Remover o freelancer do projeto, nenhum outro campo
                        deve ser preenchido.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className='flex flex-col gap-3'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <div>
                            <FormField
                                control={form.control}
                                name='ammount'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor a pagar</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder='Descreva as condições de pagamento. Por exemplo se deverá ser feito em parcelas ou não'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting && <Loader />} Salvar
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
