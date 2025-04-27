import { getMe } from "@/actions/users/get-me";
import { updateUserCard } from "@/actions/users/update-user-card";
import { getPreviewUrl } from "@/utils/get-preview-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface IuseUpdateUserProps {
    form: UseFormReturn<
        {
            username: string;
            avatar?: File | undefined;
        },
        undefined
    >;
    previewUrl: string | null;
    me: { avatarUrl?: string; name: string } | null;
    onSubmit: (data: FormProps) => Promise<void>;
    isSubmitting: boolean;
}

export const formSchema = z.object({
    username: z
        .string()
        .min(3, "O nome de usuário deve ter no mínimo 3 caracteres"),
    avatar: z.instanceof(File).optional(),
});

export type FormProps = z.infer<typeof formSchema>;

export function useUpdteUserCard(): IuseUpdateUserProps {
    const [me, setMe] = useState<{ avatarUrl?: string; name: string } | null>(
        null
    );

    const form = useForm<FormProps>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    const previewUrl = getPreviewUrl(form.watch("avatar"));

    useEffect(() => {
        (async () => {
            const data = await getMe();
            setMe({ avatarUrl: data.avatarUrl, name: data.username });
            form.reset({
                username: data.username,
            });
        })();
    }, []);

    useEffect(() => {
        if (isSubmitSuccessful) {
            form.reset({
                avatar: undefined,
            });
        }
    }, [isSubmitSuccessful, form]);

    async function onSubmit(data: FormProps) {
        await updateUserCard(data);
    }

    return {
        form,
        previewUrl,
        me,
        onSubmit,
        isSubmitting,
    };
}
