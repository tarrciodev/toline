import { loginWithAuthProvider } from "@/actions/users/login-with-auth-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthButtonProviderButton } from "../auth-button-provider";
import { FormMessage } from "../form-message";
import LoginWithCredentials from "./login-with-credentials";
import { IAuthFormProps } from "./register-form";

export async function LoginForm({
    className,
    provider,
    ...props
}: IAuthFormProps) {
    let displayFormMessage = false;
    if (provider) {
        const data = await loginWithAuthProvider();

        if (data.status === "error") {
            displayFormMessage = true;
        }

        if (data.status === "success") redirect("/dash");
    }

    return (
        <div
            className={cn("flex flex-col gap-3 sm:w-[30vw]", className)}
            {...props}
        >
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle className='text-xl'>Seja bem vindo</CardTitle>
                    <CardDescription>
                        Faça o login com Google ou o Github
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className='grid gap-3'>
                            <div className='flex gap-4 justify-center'>
                                <AuthButtonProviderButton
                                    provider='google'
                                    currentUrl='login'
                                />
                                <AuthButtonProviderButton
                                    provider='github'
                                    currentUrl='login'
                                />
                            </div>
                            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                                <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                                    Ou continue Com
                                </span>
                            </div>
                            {displayFormMessage && (
                                <FormMessage message='Nenum usuario foi encontrado' />
                            )}
                            <LoginWithCredentials />

                            <div className='flex justify-center sm:justify-between text-sm'>
                                <Link
                                    href='/forgot-password'
                                    className='text-blue-800 font-semibold'
                                >
                                    Esqueci a minha senha
                                </Link>
                                <div className='hidden sm:flex'>
                                    Não tem uma conta?{" "}
                                    <Link
                                        href='/register'
                                        className='underline underline-offset-4'
                                    >
                                        Sign up
                                    </Link>
                                </div>
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
