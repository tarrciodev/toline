"use client";
import { Icategories } from "@/actions/categories/get-categories";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuerySetter } from "@/utils/query-state";

export function MobileProjectCategoryFilter({
    categories,
}: {
    categories: Icategories[];
}) {
    const { setQueryParams } = useQuerySetter();
    return (
        <div className='flex sm:hidden w-full'>
            <Select onValueChange={(value) => setQueryParams("slug", value)}>
                <SelectTrigger className='sm:w-[180px]'>
                    <SelectValue placeholder='Filtrar por categoria' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((category) => (
                            <SelectItem value={category.slug} key={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
