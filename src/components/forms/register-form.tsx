import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { registerSocial } from "@/actions/users/register-social";
import { redirect } from "next/navigation";
import { AuthButtonProviderButton } from "../auth-button-provider";
import { FormMessage } from "../form-message";
import { MultiStepForm } from "../MultForm";

export interface IAuthFormProps extends React.ComponentPropsWithoutRef<"div"> {
    provider: "google" | "github" | null | undefined;
    pathname?: "client" | "freelancer";
}

export async function RegisterForm({
    className,
    provider,
    pathname,
    ...props
}: IAuthFormProps) {
    let displayFormMessage = false;
    if (provider) {
        const data = await registerSocial(pathname!);
        if (data.status === "error") {
            displayFormMessage = true;
        }
        if (data.status === "success") redirect("/dash");
    }

    const isFreelancer = pathname == "freelancer";

    return (
        <div
            className={cn("flex flex-col gap-3 sm:w-[30vw]", className)}
            {...props}
        >
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>
                        Cadastra-se para{" "}
                        {isFreelancer ? "trabalhar" : "contratar"}
                    </CardTitle>
                    <CardDescription>
                        {isFreelancer ? (
                            <p>
                                Quer Contratar ?{" "}
                                <Link
                                    href='/register/client'
                                    className='text-blue-600 font-medium'
                                >
                                    Cadastra-se como cliente
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Quer trabalhar ?{" "}
                                <Link
                                    href='/register/freelancer'
                                    className='text-blue-600 font-medium'
                                >
                                    Cadastra-se como freelancer
                                </Link>
                            </p>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex sm:gap-4'>
                                <AuthButtonProviderButton
                                    provider='google'
                                    currentUrl={`register/${pathname}`}
                                />
                            </div>
                            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                                    Ou continue com
                                </span>
                            </div>
                            {displayFormMessage && (
                                <FormMessage message='Essa conta já existe' />
                            )}
                            <MultiStepForm />
                            <div className='text-center text-sm'>
                                Já tem uma conta?{" "}
                                <Link
                                    href='/login'
                                    className='underline underline-offset-4'
                                >
                                    login
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  '>
                By clicking continue, you agree to our{" "}
                <a href='#'>Terms of Service</a> and{" "}
                <a href='#'>Privacy Policy</a>.
            </div>
        </div>
    );
}
