"use client";
import { forgotPassword } from "@/actions/users/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const ForgotPasswordSchema = z.object({
    email: z.string().email("Email inválido"),
});

export type ForgotPasswordProps = z.infer<typeof ForgotPasswordSchema>;

type ForgotPasswordResponse = {
    form: UseFormReturn<{
        email: string;
    }>;
    handleSubmit: (data: ForgotPasswordProps) => Promise<void>;
    forgotMessage: { status: string; message: string };
    isSubmitting: boolean;
};

export function useForgotPasswordService(): ForgotPasswordResponse {
    const [forgotMessage, setForgotMessage] = useState<{
        status: string;
        message: string;
    }>({ status: "", message: "" });

    const form = useForm<ForgotPasswordProps>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const handleSubmit = async (data: ForgotPasswordProps) => {
        const response = await forgotPassword(data.email);

        setForgotMessage({
            status: response.status,
            message: response.message,
        });

        setTimeout(() => {
            setForgotMessage({ status: "", message: "" });
        }, 2500);
    };

    return {
        form,
        handleSubmit,
        forgotMessage,
        isSubmitting,
    };
}
