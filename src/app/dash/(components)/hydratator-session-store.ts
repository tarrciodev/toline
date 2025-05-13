"use client";

import { EntityProps, useEntityStore } from "@/store/entity";
import { useSessionStore } from "@/store/session";
import { setCookieStore } from "@/utils/cookie-store";
import { useEffect } from "react";

export function ClientSessionHydrator({
    logged_as,
    entity,
}: {
    logged_as: "client" | "freelancer";
    entity: EntityProps;
}) {
    const { setIsLoggedAs, logged_as: sessionLoggedAs } = useSessionStore();
    const { setEntity } = useEntityStore();

    useEffect(() => {
        if (logged_as !== sessionLoggedAs) {
            setIsLoggedAs(logged_as);
            setCookieStore("logged_as", logged_as);
        }
    }, []);

    useEffect(() => {
        if (entity) {
            setEntity(entity);
        }
    }, [entity, setEntity]);

    return null;
}
