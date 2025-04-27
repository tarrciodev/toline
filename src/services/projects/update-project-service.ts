"use client";

import { getCategories } from "@/actions/categories/get-categories";
import { updateBaseProject } from "@/actions/projects/update-base-project";
import { ProjectFullProps } from "@/store/entity";
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
});

type UpdateProjectProps = z.infer<typeof createProjectSchema>;

export interface Skill {
    id: string;
    name: string;
    description?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
}

interface Subactegories {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
    description?: string | null;
    subcategories: Subactegories[];
    skills?: Skill[] | null;
}

type UpdateProjectResponse = {
    form: UseFormReturn<
        {
            name: string;
            description: string;
            categoryId: string;
            subcategoryId?: string | undefined;
            skills?: string[] | undefined;
        },
        undefined
    >;
    isSubmitting: boolean;
    categories: Category[] | null;
    subcategories: Subactegories[];
    filteredSkills: Skill[] | undefined;
    handleSubmit: (data: UpdateProjectProps) => Promise<void>;
};

export function useUpdateProjectService(
    project: ProjectFullProps | undefined
): UpdateProjectResponse {
    const [categories, setCategories] = useState<Category[] | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);
    const form = useForm<UpdateProjectProps>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: project?.name,
            description: project?.description,
            categoryId: categories?.find(
                (category) => category.name == project?.category
            )?.id,
            subcategoryId: categories
                ?.find((category) => category.name == project?.category)
                ?.subcategories.find((sub) => sub.name == project?.subcategory)
                ?.id,
            skills: project?.skills?.map((skill) => skill.name),
        },
    });

    const { watch } = form;
    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

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

    async function handleSubmit(data: UpdateProjectProps) {
        const parsedData = {
            ...data,
            id: project?.id as string,
        };
        const response = await updateBaseProject(parsedData, filteredSkills);

        if (response.status === "rejected") {
            toast.error(response.message);
            return;
        }

        toast.success("Projeto atualizado com sucesso");
    }

    return {
        form,
        isSubmitting,
        categories,
        subcategories,
        filteredSkills,
        handleSubmit,
    };
}
