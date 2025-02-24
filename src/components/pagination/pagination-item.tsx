import clsx from "clsx";
import { ComponentProps } from "react";

type PaginationItemProps = ComponentProps<"button">;

export function PaginationItem(props: PaginationItemProps) {
    return (
        <button
            {...props}
            className={clsx(
                "bg-zinc-950 rounded border border-zinc-900 text-xs px-1",
                props.disabled ? "text-zinc-500" : "text-zinc-50"
            )}
        />
    );
}
