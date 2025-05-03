"use client";

import { useSessionStore } from "@/store/session";
import { setCookieStore } from "@/utils/cookie-store";
import { useEffect } from "react";

export function ClientSessionHydrator({
    logged_as,
}: {
    logged_as: "client" | "freelancer";
}) {
    const { setIsLoggedAs, logged_as: sessionLoggedAs } = useSessionStore();

    useEffect(() => {
        if (logged_as !== sessionLoggedAs) {
            setIsLoggedAs(logged_as);
            setCookieStore("logged_as", logged_as);
        }
    }, []);

    return null;
}
