"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function CategoryItem({
    category,
    currentSlug,
}: {
    category: { slug: string; name: string };
    currentSlug: string;
}) {
    const [selectedSlug, setSelectedSlug] = useState("");
    const isSelected = selectedSlug === currentSlug;
    function handleClick() {
        setSelectedSlug(category!.slug!);
    }
    return (
        <Link
            onClick={handleClick}
            className={cn(
                isSelected ? "text-blue-950 font-semibold" : "text-gray-700"
            )}
            href={{
                pathname: `/dash/projects`,
                query: { slug: category.slug },
            }}
        >
            {category.name}
        </Link>
    );
}
