"use client";

import { getCategories } from "@/actions/categories/get-categories";
import { createProject } from "@/actions/projects/create-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from "../ui/extension/multi-select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

// Define schema
const createProjectSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    description: z
        .string()
        .min(3, "Description must be at least 3 characters."),
    categoryId: z.string(),
    subcategoryId: z.string().optional(),
    skills: z.array(z.string()).optional(),
});

// Infer type from schema
type CreateProjectProps = z.infer<typeof createProjectSchema>;

// Define category and skill types
export interface Skill {
    id: string;
    name: string;
    description?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
}

interface Category {
    id: string;
    name: string;
    description?: string | null;
    subcategories: { id: string; name: string }[];
    skills?: Skill[] | null;
}

export function CreateProjectForm() {
    const form = useForm<CreateProjectProps>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            subcategoryId: "",
            skills: [],
        },
    });

    const { watch } = form;
    const {
        formState: { isSubmitting },
    } = form;

    const [categories, setCategories] = useState<Category[] | null>(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

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

    return (
        <Form {...form}>
            <form
                className='w-[30vw]'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <h1 className='text-center text-4xl font-semibold mb-8'>
                    Crie um novo projeto
                </h1>

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Projecto</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter project name'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descreva o Seu Projeto</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Describe your project'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex gap-2 py-4 justify-between w-full'>
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Categoria</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder='Select category' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map((cat) => (
                                                <SelectItem
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='subcategoryId'
                        render={({ field }) => (
                            <FormItem className='w-1/2'>
                                <FormLabel>Subcategoria</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={subcategories.length === 0}
                                    >
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder='Select subcategory' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subcategories.map((sub) => (
                                                <SelectItem
                                                    key={sub.id}
                                                    value={sub.id}
                                                >
                                                    {sub.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {filteredSkills && filteredSkills.length > 0 && (
                    <FormField
                        control={form.control}
                        name='skills'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skills</FormLabel>
                                <MultiSelector
                                    onValuesChange={field.onChange}
                                    values={field.value || []}
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput placeholder='Select skills' />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            {filteredSkills?.map((skill) => (
                                                <MultiSelectorItem
                                                    key={skill.id}
                                                    value={skill.name}
                                                >
                                                    {skill.name}
                                                </MultiSelectorItem>
                                            ))}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <div>
                    <Button
                        type='submit'
                        className='w-full flex gap-2'
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader />} Criar Projeto
                    </Button>
                </div>
            </form>
        </Form>
    );
}
