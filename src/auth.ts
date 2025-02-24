import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./config/api";

const authOptions = {
    providers: [
        GitHub,
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password",
                },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const userAuth = await api<{ email: string; name: string }>(
                    "/auth/credentials",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    }
                );

                if (!userAuth.email) {
                    throw new Error("Email ou senha inválidos");
                }

                return userAuth;
            },
        }),
    ],
    trustHost: true,
};

export default authOptions;
export const { handlers, auth, signIn } = NextAuth(authOptions);
