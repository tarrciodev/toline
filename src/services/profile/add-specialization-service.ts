import {
    getCategories,
    Icategories,
} from "@/actions/categories/get-categories";
import { addSpecializations } from "@/actions/users/add-specialization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    specializations: z.array(z.string()),
});

type schemaProps = z.infer<typeof schema>;

interface IAddEspecializationResponse {
    categories: Icategories[];
    displaySelectionBox: boolean;
    toggleDisplaySelectionBox: () => void;
    form: ReturnType<typeof useForm<schemaProps>>;
    isSubmitting: boolean;
    handleSubmit: (data: schemaProps) => Promise<void>;
}
export function useAddEspecializationService(
    tolinerId: string
): IAddEspecializationResponse {
    const form = useForm<schemaProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            specializations: [],
        },
    });
    const {
        formState: { isSubmitting },
    } = form;

    const { data: categories } = useQuery<Icategories[]>({
        queryKey: ["categories"],
        queryFn: async () => await getCategories(),
    });

    const [displaySelectionBox, setDisplaySelectionBox] = useState(false);
    function toggleDisplaySelectionBox() {
        setDisplaySelectionBox((prev) => !prev);
    }

    async function handleSubmit(data: schemaProps) {
        const response = await addSpecializations({
            tolinerId,
            specializations: data.specializations,
        });

        if (response.status === "error") {
            toast.error(response.message);
        }
    }

    return {
        categories: categories ?? [],
        displaySelectionBox,
        toggleDisplaySelectionBox,
        form,
        isSubmitting,
        handleSubmit,
    };
}
