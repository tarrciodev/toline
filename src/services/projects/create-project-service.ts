"use client";

import { getCategories } from "@/actions/categories/get-categories";
import { createProject } from "@/actions/projects/create-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createProjectSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    description: z
        .string()
        .min(3, "Description must be at least 3 characters."),
    categoryId: z.string(),
    subcategoryId: z.string().optional(),
    skills: z.array(z.string()).optional(),
    quotation: z.coerce.number().optional(),
});

type CreateProjectProps = z.infer<typeof createProjectSchema>;

export interface Skill {
    id: string;
    name: string;
    description?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
}

interface Subcategories {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
    description?: string | null;
    subcategories: Subcategories[];
    skills?: Skill[] | null;
}

interface IUseCreateProjectServiceResponse {
    form: UseFormReturn<
        {
            name: string;
            description: string;
            categoryId: string;
            subcategoryId?: string | undefined;
            skills?: string[] | undefined;
            quotation?: number;
        },
        undefined
    >;
    isSubmitting: boolean;
    isSubmitSuccessful: boolean;
    categories: Category[] | null;
    subcategories: Subcategories[];
    filteredSkills: Skill[] | undefined;
    handleSubmit: (data: CreateProjectProps) => Promise<void>;
}

export function useCreateProjectService(): IUseCreateProjectServiceResponse {
    const form = useForm<CreateProjectProps>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            subcategoryId: "",
            skills: [],
            quotation: 0,
        },
    });

    const { watch } = form;
    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            form.reset();
        }
    }, [isSubmitSuccessful, form]);

    const categoryId = watch("categoryId");
    const category = categories?.find((cat) => cat.id === categoryId);
    const subcategories = category?.subcategories || [];
    const filteredSkills = category?.skills?.filter(
        (skill) =>
            !skill.subcategoryId ||
            skill.subcategoryId === watch("subcategoryId")
    );

    async function handleSubmit(data: CreateProjectProps) {
        const filteredSkills = category?.skills?.filter(
            (skill) =>
                !skill.subcategoryId ||
                skill.subcategoryId === watch("subcategoryId")
        );
        const response = await createProject(data, filteredSkills);
        if (response.status === "rejected") {
            toast.error(response.message);
            return;
        }

        toast.success("Projeto criado com sucesso");
    }

    return {
        form,
        isSubmitting,
        categories,
        subcategories,
        filteredSkills,
        handleSubmit,
        isSubmitSuccessful,
    };
}
