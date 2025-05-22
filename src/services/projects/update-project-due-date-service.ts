"use client";

import { updateProjectDueDate } from "@/actions/projects/update-project-due-date";
import { Dependencies } from "@/components/dash/edit-project-due-date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const schema = z.object({
    dueDate: z.date().nullable().optional(),
    projectId: z.string().uuid(),
});

export type ProjectDueDateProps = z.infer<typeof schema>;

interface UseClientPaymentServiceResponse {
    form: ReturnType<typeof useForm<ProjectDueDateProps>>;
    isSubmitting: boolean;
    handleSubmit: (data: ProjectDueDateProps) => Promise<void>;
    triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function useUpdateProjectDueDateService(
    dependencies: Dependencies
): UseClientPaymentServiceResponse {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const form = useForm<ProjectDueDateProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            dueDate: null,
            projectId: dependencies?.projectId as string,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function handleSubmit(data: ProjectDueDateProps) {
        const response = await updateProjectDueDate(data);

        if (response.status === "success") {
            form.reset();
            toast.success(response.message);
            setTimeout(() => {
                triggerRef.current?.click();
            }, 2500);

            return;
        }

        toast.error(response.message);
    }

    return {
        form,
        isSubmitting,
        handleSubmit,
        triggerRef,
    };
}
