import { RegisterForm } from "@/components/forms/register-form";

export default async function Freelancer({
    searchParams,
}: {
    searchParams: Promise<{ provider?: "google" | "github" | null }>;
}) {
    const params = await searchParams;
    const provider = params?.provider;
    return (
        <div className='flex flex-1 justify-center'>
            <RegisterForm provider={provider} pathname='freelancer' />
        </div>
    );
}
