import { getMe } from "@/actions/users/get-me";
import React from "react";

export async function Can({
    who,
    children,
}: {
    who: "client" | "freelancer";
    children: React.ReactNode;
}) {
    const me = await getMe();

    const isAuthorized = who === me?.type;

    if (!isAuthorized) {
        return <></>;
    }

    return children;
}
