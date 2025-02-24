import { addShowCase } from "@/actions/freelancer/add-show-case";
import { getSkills, Skills } from "@/actions/skills/get-skills";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ProjectSchema = z.object({
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

    completedAt: z.string().optional(),
});

export type ShowCaseProps = z.infer<typeof ProjectSchema>;

interface IAddPortfolioServiceProps {
    form: ReturnType<typeof useForm<ShowCaseProps>>;
    isSubmitting: boolean;
    cover: File | null;
    assets: File[];
    handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAssetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (data: ShowCaseProps) => Promise<void>;
    skills: Skills[];
}

export function useAddPortfolioService(
    freelancerId: string
): IAddPortfolioServiceProps {
    const form = useForm<ShowCaseProps>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: "",
            description: "",
            assets: [],
            completedAt: "",
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
        await addShowCase(data, freelancerId);
    }
    return {
        form,
        isSubmitting,
        cover,
        assets,
        handleCoverChange,
        handleAssetsChange,
        onSubmit,
        skills,
    };
}
