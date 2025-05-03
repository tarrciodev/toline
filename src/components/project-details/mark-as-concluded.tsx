"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMarkProjectAsConcludedService } from "@/services/projects/mark-project-as-concluded-service";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import { cn } from "@/lib/utils";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface IMarkProjectAsConcluedeProps {
    project: {
        id: string;
        freelancerId?: string;
        ownerId: string;
        status: "Em andamento" | "Concluido" | "Não Iniciado";
    };
}
export function MarkProjectAsConcluded({
    project,
}: IMarkProjectAsConcluedeProps) {
    const { form, handleMarkProjectAsConcluded, isSubmitting, triggerRef } =
        useMarkProjectAsConcludedService({
            clientId: project.ownerId,
            projectId: project.id,
            freelancerId: project.freelancerId!,
        });

    const isCompleted = project.status === "Concluido";
    const isDisabled = isSubmitting || isCompleted;
    return (
        <Dialog>
            {isCompleted ? (
                <div
                    className={cn(
                        "rounded-lg py-2 px-2 w-full text-center bg-black/40 text-white cursor-not-allowed"
                    )}
                >
                    Marcar Como Concluído {isCompleted ? 0 : 1}{" "}
                </div>
            ) : (
                <DialogTrigger asChild className='w-full'>
                    <div
                        ref={triggerRef}
                        className='rounded-lg py-2 px-2 w-full cursor-pointer bg-black hover:bg-black/80 text-center text-red-50'
                    >
                        Marcar Como Concluído
                    </div>
                </DialogTrigger>
            )}
            <DialogContent className='px-12'>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        Ao marcar o seu projeto como concluído já não poderá
                        fazer nenhuma alteração.
                    </DialogDescription>
                    <Form {...form}>
                        <form
                            className='flex flex-col gap-3'
                            onSubmit={form.handleSubmit(
                                handleMarkProjectAsConcluded
                            )}
                        >
                            <div>
                                <FormField
                                    control={form.control}
                                    name='rate'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Avaliação</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Selecione uma opção' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='Excelente'>
                                                            Excelente
                                                        </SelectItem>
                                                        <SelectItem value='Razoavel'>
                                                            Razoável
                                                        </SelectItem>
                                                        <SelectItem value='Mediano'>
                                                            Mediano
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='comment'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Justifique a sua avaliação
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type='submit'
                                className='cursor-pointer'
                                disabled={isDisabled}
                            >
                                {isSubmitting && <Loader />}Concluir
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
