import { LoginForm } from "@/components/forms/login-form";

export default async function Login({
    searchParams,
}: {
    searchParams: Promise<{ provider?: "google" | "github" | null }>;
}) {
    const params = await searchParams;
    const provider = params?.provider;
    return (
        <div>
            <LoginForm provider={provider} />
        </div>
    );
}
