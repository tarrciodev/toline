/* eslint-disable @typescript-eslint/no-explicit-any */
import { markProjectAsConcluded } from "@/actions/client/mark-project-as-concluded";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    rate: z.string({ required_error: "Selecione uma opção" }),
    comment: z
        .string({ required_error: "Justifique a sua avaliação" })
        .min(1, { message: "Justifique a sua avaliação" }),
});
interface IMarkProjectAsConcluedeProps {
    clientId: string;
    projectId: string;
    freelancerId: string;
}

interface IMarkProjectAsConcluedeResponse {
    form: UseFormReturn<
        {
            rate: string;
            comment: string;
        },
        any,
        undefined
    >;
    isSubmitSuccessful: boolean;
    isSubmitting: boolean;
    handleMarkProjectAsConcluded: (data: {
        rate: string;
        comment: string;
    }) => Promise<void>;
}

export function useMarkProjectAsConcludedService({
    clientId,
    projectId,
    freelancerId,
}: IMarkProjectAsConcluedeProps): IMarkProjectAsConcluedeResponse {
    const form = useForm<{
        rate: string;
        comment: string;
    }>({
        resolver: zodResolver(schema),
        defaultValues: {
            rate: "Excelente",
            comment: "",
        },
    });

    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    useEffect(() => {
        if (isSubmitSuccessful) {
            form.reset();
        }
    }, [isSubmitSuccessful, form]);

    async function handleMarkProjectAsConcluded(data: {
        rate: string;
        comment: string;
    }) {
        await markProjectAsConcluded({
            dependencies: {
                clientId,
                projectId,
                freelancerId,
            },
            data,
        });
    }

    return {
        form,
        isSubmitting,
        isSubmitSuccessful,
        handleMarkProjectAsConcluded,
    };
}
