import { Logo } from "@/components/logo";
import Link from "next/link";
import ForgotPasswordForm from "./(components)/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <div className='h-screen bg-white'>
            <header className='px-40'>
                <Logo redirectTo='/' />
            </header>
            <div className='flex flex-1 justify-center pt-4'>
                <div className='w-[30vw] p-8'>
                    <h1 className='py-8'>Recupere a sua Senha</h1>
                    <span>
                        Digite seu endereço de e-mail e enviaremos um link para
                        redefinir sua senha.
                    </span>
                    <ForgotPasswordForm />
                    <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-5'>
                        <Link
                            href='/login'
                            className='relative z-10 bg-background px-2 text-muted-foreground'
                        >
                            Ou volte para login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
