import { Logo } from "@/components/logo";
import { Suspense } from "react";
import { ResetPasswordForm } from "./(components)/reset-password-form";

export default function ResetPassword() {
    return (
        <div className='h-screen bg-white'>
            <header className='px-40'>
                <Logo redirectTo='/' />
            </header>
            <div className='flex flex-1 justify-center pt-4'>
                <div className='w-[30vw]  p-8'>
                    <h1 className='px-0 font-semibold'>Reset Password</h1>
                    <Suspense>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
