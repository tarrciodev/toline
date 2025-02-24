"use client";

import { subscribeOnProject } from "@/actions/projects/subscribe-on-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SubscriptionSchema = z.object({
    estimatedTime: z
        .string()
        .nonempty(
            "Por favor, informe o tempo necessário para terminar o projeto."
        )
        .min(5, "A resposta deve ter pelo menos 5 caracteres."),
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

export function useSendProposalServices(
    projectId: string,
    freelancerId: string
) {
    const form = useForm<SubscriptionProps>({
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {
            estimatedTime: "",
            requiredInformations: "",
            similarExperiences: "",
            quotation: 0,
        },
    });

    const {
        formState: { isSubmitSuccessful, isSubmitting },
    } = form;
    async function onSubmit(data: SubscriptionProps) {
        await subscribeOnProject(data, {
            projectId,
            freelancerId,
        });
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast.success("Proposta enviada com sucesso!");
        }
    }, [isSubmitSuccessful]);

    return {
        form,
        isSubmitting,
        onSubmit,
    };
}
