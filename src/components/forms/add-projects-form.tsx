"use client";
import { addShowCase } from "@/actions/freelancer/add-show-case";
import { getSkills, Skills } from "@/actions/skills/get-skills";
import { getPreviewUrl } from "@/utils/get-preview-url";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

const ProjectSchema = z.object({
    title: z
        .string()
        .min(1, { message: "O título é obrigatório." })
        .max(100, { message: "O título deve ter no máximo 100 caracteres." }),

    description: z
        .string()
        .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
        .max(1000, {
            message: "A descrição deve ter no máximo 1000 caracteres.",
        }),

    cover: z
        .custom<File | null>(
            (file) => file === null || file?.type.startsWith("image/"),
            {
                message:
                    "A imagem de capa deve ser um arquivo de imagem válido.",
            }
        )
        .refine((file) => file !== null, {
            message: "A imagem de capa é obrigatória.",
        }),
    assets: z
        .array(
            z.custom<File>((file) => file.type.startsWith("image/"), {
                message: "Cada item na galeria deve ser uma imagem válida.",
            })
        )
        .min(1, {
            message: "Você deve adicionar pelo menos uma imagem na galeria.",
        }),

    skills: z.array(z.string()).optional(),

    concluedAt: z.string().optional(),
});

export type ShowCaseProps = z.infer<typeof ProjectSchema>;

export function AddShowCaseForm({ entityId }: { entityId: string }) {
    const form = useForm<ShowCaseProps>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: "",
            description: "",
            assets: [],
            concluedAt: "",
        },
    });

    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    useEffect(() => {
        if (isSubmitSuccessful) {
            form.reset();
        }
    }, [isSubmitSuccessful, form]);

    const [skills, setSkills] = useState<Skills[]>([]);

    useEffect(() => {
        (async () => {
            const response = await getSkills();
            setSkills(response);
        })();
    }, []);

    // Watch para monitorar alterações no formulário
    const cover = form.watch("cover");
    const assets = form.watch("assets");

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            form.setValue("cover", file, { shouldValidate: true });
        }
    };

    const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        form.setValue("assets", files, { shouldValidate: true });
    };

    // Modify handleSubmit to ensure validation happens before submission
    async function onSubmit(data: ShowCaseProps) {
        await addShowCase(data, entityId);
    }

    return (
        <ScrollArea className='h-[80dvh]'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-2'
                >
                    <div>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título do Projeto</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Digite o título do projeto'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição do Projeto</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Digite a descrição do projeto'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='cover'
                            render={() => (
                                <FormItem>
                                    <FormLabel>Imagem de Capa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            onChange={handleCoverChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {cover && (
                            <div>
                                <Image
                                    src={getPreviewUrl(cover)!}
                                    alt={cover.name}
                                    className='w-full h-48 object-cover'
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='assets'
                            render={() => (
                                <FormItem>
                                    <FormLabel>Galeria</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            multiple
                                            onChange={handleAssetsChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {assets.length > 0 && (
                            <div className='grid grid-cols-3'>
                                {assets.map((asset) => {
                                    const url = getPreviewUrl(asset) as string;
                                    return (
                                        <div key={asset?.name}>
                                            <Image
                                                src={url!}
                                                alt={asset?.name}
                                                className='w-full h-48 object-cover'
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='skills'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Habilidades Usadas</FormLabel>
                                    <MultiSelector
                                        onValuesChange={field.onChange}
                                        values={field.value || []}
                                    >
                                        <MultiSelectorTrigger>
                                            <MultiSelectorInput placeholder='Select skills' />
                                        </MultiSelectorTrigger>
                                        <MultiSelectorContent>
                                            <MultiSelectorList>
                                                {skills?.map((skill) => (
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
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='concluedAt'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data da Conclusão</FormLabel>
                                    <FormControl>
                                        <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting && <Loader />} Salvar
                    </Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
