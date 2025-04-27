import { resetPassword } from "@/actions/users/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const ResetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password deve ter pelo menos 8 caracteres")
            .regex(
                /[A-Z]/,
                "Password deve conter pelo menos uma letra maiúscula"
            )
            .regex(
                /[a-z]/,
                "Password deve conter pelo menos uma letra minúscula"
            )
            .regex(/\d/, "Password deve conter pelo menos um número"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords devem combinar",
        path: ["confirmPassword"],
    });

export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;

type ResetPasswordResponse = {
    form: UseFormReturn<
        {
            password: string;
            confirmPassword: string;
        },
        undefined
    >;
    handleSubmit: (data: ResetPasswordProps) => Promise<void>;
    resetResult: {
        status: string;
        message: string;
    };
    isSubmitting: boolean;
};
export function useResetPasswordService(): ResetPasswordResponse {
    const form = useForm<ResetPasswordProps>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const [resetResult, setResetResult] = useState({ status: "", message: "" });
    const query = useSearchParams();

    const email = query.get("email") as string;
    const code = query.get("code") as string;

    async function handleSubmit(data: ResetPasswordProps) {
        const reset = await resetPassword({ ...data, code, email });

        if (reset.status === "success") {
            redirect("/dash");
        }

        setResetResult({ status: reset.status, message: reset.message });
        setTimeout(() => {
            setResetResult({ status: "", message: "" });
        }, 3000);
    }

    return {
        form,
        handleSubmit,
        resetResult,
        isSubmitting,
    };
}
