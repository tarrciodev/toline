import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { cookies } from "next/headers";
import React from "react";

export async function Can({
    who,
    children,
}: {
    who: "client" | "freelancer";
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const entity = await getTolinerAsEntity();

    const userIsLoggedAs = cookieStore.get("logged_as")?.value ?? entity.type;

    const isAuthorized = who === (userIsLoggedAs as "client" | "freelancer");

    if (!isAuthorized) {
        return <></>;
    }

    return children;
}
