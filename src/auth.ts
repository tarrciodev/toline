import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { api } from "./config/api";

const authOptions = {
    providers: [
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

                const userAuth = await api<{
                    email: string;
                    name: string;
                    type: string;
                }>("/auth/credentials", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (!userAuth.email) {
                    throw new Error("Email ou senha inválidos");
                }

                const response = await fetch(
                    `${process.env.SITE_URL}/api/set-cookie`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userType: userAuth.type,
                        }),
                    }
                );

                const data = await response.json();
                console.log({ data });

                return userAuth;
            },
        }),
    ],
    trustHost: true,
};

export default authOptions;
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
