import { signIn } from "@/auth";

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dash" });
            }}
        >
            <button type='submit'>Signin</button>
        </form>
    );
}
