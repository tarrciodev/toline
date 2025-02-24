import { AcountHeader } from "@/components/acount-header";
import { LoginForm } from "@/components/forms/login-form";

export default async function Login({
    searchParams,
}: {
    searchParams: Promise<{ provider?: "google" | "github" | null }>;
}) {
    const params = await searchParams;
    const provider = params?.provider;
    return (
        <div className='flex flex-col h-screen bg-gray-200'>
            <AcountHeader />
            <div className='flex flex-1 justify-center sm:pt-8 '>
                <LoginForm provider={provider} />
            </div>
        </div>
    );
}
