"use client";
import { useEntityStore } from "@/store/entity";

export function CanIf({
    fallback,
    children,
    isVerified,
}: {
    fallback?: React.ReactElement;
    children: React.ReactNode;
    isVerified?: boolean;
    subscription?: string;
}) {
    const { entity } = useEntityStore();
    if (isVerified) {
        if (!entity?.isVerified) {
            return fallback ?? null;
        }
        return <>{children}</>;
    }
}
