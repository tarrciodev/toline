"use client";

import { registerWithCredentials } from "@/actions/users/register-with-credentials";
import { FormMessage as EmailMessageError } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import { api } from "@/config/api";
import { zodResolver } from "@hookform/resolvers/zod"; // Ajuste o caminho do schema
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Step1, step1ValidationSchema } from "./step1";
import { Step2 } from "./step2";

type FormProps = {
    name: string;
    email: string;
    password: string;
    code: string;
};

export function MultiStepForm() {
    // Use the Zod schema for form validation
    const pathname = usePathname().split("/").pop() as string;
    const [displayFormMessage, setDisplayFormMessage] = useState(false);
    const methods = useForm({
        resolver: zodResolver(step1ValidationSchema), // Adicione o zodResolver
        defaultValues: {
            name: "",
            email: "",
            password: "",
            code: "",
        },
        mode: "onTouched", // Realiza a validação assim que o campo é tocado
    });

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { component: <Step1 />, title: "Informações Pessoais" },
        { component: <Step2 />, title: "Verificação" },
    ];

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const nextStep = async () => {
        //Aciona a validação para o Step1

        const email = methods.getValues("email");
        const name = methods.getValues("name").split(" ")[0];
        const code = await api<number>(`/user/verification-code/${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "register", name }),
        });

        if (!Number(code)) {
            return;
        }

        const isValid = await methods.trigger();

        if (isValid) {
            // Se o Step1 for válido, avançamos para o próximo passo
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => setCurrentStep((prev) => prev - 1);

    async function onSubmit(data: FormProps) {
        const register = await registerWithCredentials(data, pathname);

        if (register?.status == "error") {
            setDisplayFormMessage(true);
            return;
        }

        toast.success("Conta criada com sucesso");

        setTimeout(() => {
            redirect("/dash");
        }, 2000);
    }

    return (
        <FormProvider {...methods}>
            {displayFormMessage && (
                <EmailMessageError message='Essa conta já existe' />
            )}
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className='space-y-6'
            >
                <h2 className='text-xl font-semibold'>
                    {steps[currentStep].title}
                </h2>

                {steps[currentStep].component}

                <div className='flex justify-between pt-4'>
                    {!isFirstStep && (
                        <Button
                            type='button'
                            variant='outline'
                            onClick={prevStep}
                        >
                            Voltar
                        </Button>
                    )}

                    {!isLastStep ? (
                        <Button
                            type='button'
                            className='w-full'
                            onClick={nextStep}
                        >
                            Próximo
                        </Button>
                    ) : (
                        <Button type='submit'>Finalizar</Button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
}
