import { getMe } from "@/actions/users/get-me";
import { updateUserCard } from "@/actions/users/update-user-card";
import { getPreviewUrl } from "@/utils/get-preview-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useEffect, useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IuseUpdateUserProps {
    form: UseFormReturn<
        {
            username: string;
            avatar?: File | undefined;
            jobDescription?: string;
        },
        undefined
    >;
    previewUrl: string | null;
    me: { avatarUrl?: string; name: string } | null;
    onSubmit: (data: FormProps) => Promise<void>;
    isSubmitting: boolean;
    triggerRef: RefObject<HTMLSpanElement | null>;
}

export const formSchema = z.object({
    username: z
        .string()
        .min(3, "O nome de usuário deve ter no mínimo 3 caracteres"),
    avatar: z.instanceof(File).optional(),
    jobDescription: z.string().optional(),
});

export type FormProps = z.infer<typeof formSchema>;

export function useUpdteUserCard(): IuseUpdateUserProps {
    const triggerRef = useRef<HTMLSpanElement | null>(null);
    const [me, setMe] = useState<{ avatarUrl?: string; name: string } | null>(
        null
    );

    const form = useForm<FormProps>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            jobDescription: "",
        },
    });

    const {
        formState: { isSubmitting },
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

    async function onSubmit(data: FormProps) {
        const response = await updateUserCard(data);

        if (response.status == "success") {
            toast.success(response.message);
            setTimeout(() => {
                form.reset({
                    avatar: undefined,
                });
                triggerRef.current?.click();
            });

            return;
        }

        toast.error(response.message);
    }

    return {
        form,
        previewUrl,
        me,
        onSubmit,
        isSubmitting,
        triggerRef,
    };
}
