"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function FormMessage({
    message,
    small,
    className,
}: {
    message: string | undefined;
    small?: boolean;
    className?: string;
}) {
    const [text, setText] = useState(message);

    useEffect(() => {
        setTimeout(() => {
            setText("");
        }, 3000);
    }, [message]);

    return (
        <div>
            {text && (
                <p
                    className={cn(
                        "text-destructive w-full",
                        small
                            ? "text-sm"
                            : "text-[1.2rem] text-center font-semibold",
                        className
                    )}
                >
                    {text}
                </p>
            )}
        </div>
    );
}
