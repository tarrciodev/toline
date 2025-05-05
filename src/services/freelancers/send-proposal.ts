"use client";

import { subscribeOnProject } from "@/actions/projects/subscribe-on-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useEffect, useRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SubscriptionSchema = z.object({
    estimatedTime: z
        .string()
        .nonempty(
            "Por favor, informe o tempo necessário para terminar o projeto."
        )
        .min(5, "A resposta deve ter pelo menos 5 caracteres."),
    proposal: z
        .string()
        .nonempty("Por favor, informe o motivo para escolher você."),
    requiredInformations: z
        .string()
        .nonempty("Por favor, informe as informações necessárias para começar.")
        .min(5, "A resposta deve ter pelo menos 5 caracteres."),
    similarExperiences: z
        .string()
        .nonempty(
            "Por favor, fale sobre sua experiência em projetos similares."
        )
        .min(
            20,
            "A descrição da experiência deve ter pelo menos 20 caracteres."
        ),
    quotation: z.preprocess(
        (value) => {
            // Tenta converter o valor para número, caso seja uma string.
            if (typeof value === "string" && value.trim() !== "") {
                return parseFloat(value);
            }
            return value; // Retorna o valor original se não for uma string.
        },
        z
            .number({
                invalid_type_error: "O orçamento deve ser um número.",
            })
            .min(1, "O orçamento deve ser maior que zero.")
            .nonnegative("O orçamento não pode ser negativo.")
    ),
});

export type SubscriptionProps = z.infer<typeof SubscriptionSchema>;

type UseSendProposalResponse = {
    onSubmit: (data: SubscriptionProps) => Promise<void>;
    isSubmitting: boolean;
    form: UseFormReturn<
        {
            estimatedTime: string;
            requiredInformations: string;
            similarExperiences: string;
            proposal: string;
            quotation: number;
        },
        undefined
    >;
    triggerRef: RefObject<HTMLDivElement | null>;
};

export function useSendProposalServices(
    projectId: string,
    tolinerId: string
): UseSendProposalResponse {
    const form = useForm<SubscriptionProps>({
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {
            estimatedTime: "",
            requiredInformations: "",
            similarExperiences: "",
            proposal: "",
            quotation: 0,
        },
    });

    const triggerRef = useRef<HTMLDivElement | null>(null);

    const {
        formState: { isSubmitSuccessful, isSubmitting },
    } = form;
    async function onSubmit(data: SubscriptionProps) {
        await subscribeOnProject(data, {
            projectId,
            tolinerId,
        });
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast.success("Proposta enviada com sucesso!");
            triggerRef.current?.click();
        }
    }, [isSubmitSuccessful]);

    return {
        form,
        isSubmitting,
        onSubmit,
        triggerRef,
    };
}
