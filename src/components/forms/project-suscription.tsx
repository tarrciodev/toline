"use client";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

import { useSendProposalServices } from "@/services/freelancers/send-proposal";
import { CustomEditorField } from "../custom-editor-field";
import { CustomFormField } from "../custom-form-field";
import { Loader } from "../loader";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ProjectSuscriptionForm({
    projectId,
    tolinerId,
}: {
    projectId: string;
    tolinerId: string;
}) {
    const { form, onSubmit, isSubmitting, triggerRef } =
        useSendProposalServices(projectId, tolinerId);

    return (
        <Dialog>
            <DialogTrigger className='w-full' asChild>
                <div
                    ref={triggerRef}
                    className='flex justify-center bg-black hover:bg-black/80 text-white w-full py-2 rounded-lg cursor-pointer'
                >
                    Enviar Proposta
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Envie sua proposta</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full sm:w-[30vw] pr-4'
                    >
                        <div className='flex flex-col gap-2'>
                            <CustomFormField
                                control={form.control}
                                name='estimatedTime'
                                label='Quanto tempo precisa para terminar o projeto?'
                            >
                                <Input placeholder='exempo: (duas semanas)' />
                            </CustomFormField>

                            <CustomFormField
                                control={form.control}
                                name='requiredInformations'
                                label='Que informações precisa para começar?'
                            >
                                <Textarea placeholder='fale de forma resumida' />
                            </CustomFormField>

                            <CustomFormField
                                control={form.control}
                                name='similarExperiences'
                                label='Fale um pouco de sua experiencia em projetos similares'
                            >
                                <Textarea placeholder='fale de forma resumida' />
                            </CustomFormField>
                            <CustomFormField
                                control={form.control}
                                name='quotation'
                                label='Qual é o seu orçamento para este trabalho?'
                            >
                                <Input type='number' />
                            </CustomFormField>
                            <CustomEditorField
                                control={form.control}
                                name='proposal'
                                label='Escreva a sua proposta'
                            />
                        </div>

                        <Button
                            className='w-full mt-3 cursor-pointer'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader />} Enviar Proposta
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
