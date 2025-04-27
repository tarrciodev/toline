"use server";

import { cookies } from "next/headers";

export async function setAccountTo(accountType: "client" | "freelancer") {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "logged_as",
        value: accountType,
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
        httpOnly: false, // Permite acesso no navegador
        sameSite: "lax", // Mantém o cookie acessível entre requisições
    });
}
