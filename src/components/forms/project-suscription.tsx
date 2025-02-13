/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Loader } from "../loader";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ProjectSuscriptionForm({
    projectId,
    freelancerId,
}: {
    projectId: string;
    freelancerId: string;
}) {
    const { form, onSubmit, isSubmitting } = useSendProposalServices(
        projectId,
        freelancerId
    );
    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <div className='flex justify-center bg-black hover:bg-black/80 text-white w-full py-2 rounded-lg cursor-pointer'>
                    Enviar Proposta
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Envie sua proposta</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name='estimatedTime'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Quanto tempo precisa para terminar o
                                            projeto?
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='exempo: (duas semanas)'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name='information'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Que informações precisa para
                                            começar?
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='exempo: (duas semanas)'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name='justification'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Porque se considera o candidato
                                            ideal?
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name='similarExperiences'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Fale um pouco de sua experiencia em
                                            projetos similares
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='fale de forma resumida'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name='quotation'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Qual é o seu orçamento para este
                                            trabalho?
                                        </FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            className='w-full mt-3'
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
