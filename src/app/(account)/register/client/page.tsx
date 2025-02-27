import { RegisterForm } from "@/components/forms/register-form";

export default async function Client({
    searchParams,
}: {
    searchParams: Promise<{ provider?: "google" | "github" | null }>;
}) {
    const params = await searchParams;
    const provider = params?.provider;
    return (
        <div>
            <RegisterForm provider={provider} pathname='client' />
        </div>
    );
}
