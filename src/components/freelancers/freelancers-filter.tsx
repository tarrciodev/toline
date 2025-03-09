"use client";
import {
    getCategories,
    Icategories,
} from "@/actions/categories/get-categories";
import { useQuerySetter } from "@/utils/query-state";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from "../ui/extension/multi-select";

export function FreelancersFilters() {
    const [categories, setCategories] = useState<Icategories[]>([]);

    const { searchParams, setQueryParams, removeQueryParams } =
        useQuerySetter();
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const especialization = searchParams.get("especialization");

    const skills = categories.find(
        (category) => category.slug == especialization
    )?.skills;

    useEffect(() => {
        (async () => {
            const data = await getCategories();
            setCategories(data);
        })();
    }, []);

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
                <p className='font-semibold text-neutral-900'>Especialização</p>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        className='text-blue-800'
                        href={{
                            pathname: `/dash/freelancers`,
                            query: { especialization: category.slug },
                        }}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
            <div>
                <p className='font-semibold text-neutral-900'>Habilidades</p>
                <MultiSelector
                    onValuesChange={(e) => {
                        setSelectedSkills(e);

                        if (e.length > 0) {
                            setQueryParams("skills", e.join(","));
                        } else {
                            removeQueryParams("skills"); // Remove 'skills' param if empty
                        }
                    }}
                    values={selectedSkills}
                >
                    <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder='Selecione as habilidades' />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                        <MultiSelectorList>
                            {skills?.map((skill) => (
                                <MultiSelectorItem
                                    key={skill?.slug}
                                    value={skill?.slug}
                                >
                                    {skill?.name}
                                </MultiSelectorItem>
                            ))}
                        </MultiSelectorList>
                    </MultiSelectorContent>
                </MultiSelector>
            </div>
        </div>
    );
}
