"use client";
import { useSessionStore } from "@/store/session";
import React from "react";

export function Can({
    who,
    children,
}: {
    who: "client" | "freelancer";
    children: React.ReactNode;
}) {
    const { logged_as } = useSessionStore();

    const isAuthorized = who === logged_as;

    if (!isAuthorized) {
        return <></>;
    }

    return children;
}
