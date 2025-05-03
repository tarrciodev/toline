"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FilterItem({ filter }: { filter: string }) {
    const query = useSearchParams().get("query") ?? "published";
    const label = {
        published: "Projetos Publicados",
        ongoing: "Projetos em Andamento",
        completed: "Projetos Concluídos",
    };
    return (
        <Link
            href={`/dash/client/projects?query=${filter}`}
            className={cn(
                "py-1 px-2 rounded-lg flex items-center",
                query === filter && "bg-blue-100 text-blue-600"
            )}
        >
            {label[filter as keyof typeof label]}
        </Link>
    );
}
