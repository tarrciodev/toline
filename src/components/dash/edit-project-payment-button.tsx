"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { updateProjectPayment } from "@/actions/projects/update-project-payment";
import { Edit2 } from "lucide-react";
import { z } from "zod";
import { Loader } from "../loader";
import { EditProjectDatePicker } from "./date-picker";

export const ProjectPaymentSchema = z
    .object({
        ammount: z.string().optional(),
        dueDate: z.date().nullable().optional(),
        file: z
            .instanceof(File)
            .nullable()
            .optional()
            .refine(
                (file) =>
                    !file ||
                    ["image/jpeg", "image/png", "image/gif"].includes(
                        file.type
                    ),
                "O ficheiro deve ser uma imagem válida (JPEG, PNG, GIF)"
            ),
    })
    .refine(
        (data) => {
            if (data.file && !data.ammount) {
                return false;
            }
            return true;
        },
        {
            message:
                "O campo 'file' só pode ser preenchido se o campo 'ammount' também estiver preenchido.",
            path: ["file"],
        }
    );

export type ProjectPaymentProps = z.infer<typeof ProjectPaymentSchema>;

export type PaymentDependencies = {
    projectId: string;
    ownerId: string;
};

export function EditProjectPaymentButton({
    paymentDependencies,
}: {
    paymentDependencies: PaymentDependencies;
}) {
    const form = useForm<ProjectPaymentProps>({
        resolver: zodResolver(ProjectPaymentSchema),
        defaultValues: {
            ammount: "",
            file: null,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: ProjectPaymentProps) {
        await updateProjectPayment({
            data,
            dependencies: paymentDependencies,
        });
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
