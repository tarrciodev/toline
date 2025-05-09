"use client";
import { updateFreelancerSkills } from "@/actions/freelancer/update-freelancer-skills";
import { getSkills } from "@/actions/skills/get-skills";
import { useSystemSkillsStore } from "@/store/system-skills";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SkillsList } from "./skills-list";

const schema = z.object({
    skills: z.array(z.string()),
});

type schemaProps = z.infer<typeof schema>;
export function UserProfileSkills({
    freelancerId,
    userSkills,
    publicProfile,
}: {
    freelancerId: string;
    userSkills: Array<{
        id: string;
        name: string;
    }>;
    publicProfile?: boolean;
}) {
    const form = useForm<schemaProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            skills: [],
        },
    });
    const {
        formState: { isSubmitting },
    } = form;

    const { setSystemSkills, systemSkills } = useSystemSkillsStore();
    useEffect(() => {
        (async () => {
            const data = await getSkills();
            setSystemSkills(data);
            setSystemSkills(data);
        })();
    }, []);

    const [displaySelectionBox, setDisplaySelectionBox] = useState(false);
    function toggleDisplaySelectionBox() {
        setDisplaySelectionBox((prev) => !prev);
    }

    async function handleSubmit(data: schemaProps) {
        await updateFreelancerSkills({
            freelancerId,
            skills: data.skills,
            userSkills,
            action: "add",
            systemSkills: systemSkills ?? [],
        });
    }
    return (
        <div className='bg-white p-4 rounded shadow-xl'>
            <div>
                {!displaySelectionBox && (
                    <div className='flex justify-between'>
                        <span className='font-semibold text-lg'>
                            Minhas Habilidades
                        </span>
                        {publicProfile || (
                            <span
                                className='cursor-pointer'
                                onClick={toggleDisplaySelectionBox}
                            >
                                <Pencil className='size-5' />
                            </span>
                        )}
                    </div>
                )}
            </div>
            {userSkills?.length > 0 && (
                <SkillsList
                    skills={userSkills}
                    freelancerId={freelancerId}
                    toggleDisplaySelectionBox={toggleDisplaySelectionBox}
                    displaySelectionBox={displaySelectionBox}
                />
            )}
            {displaySelectionBox && (
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='border border-gray-200 rounded p-4 mt-2'
                        >
                            <FormField
                                control={form.control}
                                name='skills'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adicionar</FormLabel>
                                        <MultiSelector
                                            onValuesChange={field.onChange}
                                            values={field.value || []}
                                        >
                                            <MultiSelectorTrigger>
                                                <MultiSelectorInput placeholder='Selecione skills' />
                                            </MultiSelectorTrigger>
                                            <MultiSelectorContent>
                                                <MultiSelectorList>
                                                    {systemSkills?.map(
                                                        (skill) => (
                                                            <MultiSelectorItem
                                                                key={skill?.id}
                                                                value={
                                                                    skill?.name
                                                                }
                                                            >
                                                                {skill?.name}
                                                            </MultiSelectorItem>
                                                        )
                                                    )}
                                                </MultiSelectorList>
                                            </MultiSelectorContent>
                                        </MultiSelector>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full flex gap-2 justify-end'>
                                <Button
                                    className='bg-red-700 hover:bg-red-600'
                                    type='button'
                                    size='sm'
                                    onClick={toggleDisplaySelectionBox}
                                >
                                    cancelar
                                </Button>
                                <Button
                                    type='submit'
                                    disabled={isSubmitting}
                                    variant='outline'
                                    size='sm'
                                >
                                    {isSubmitting && <Loader />}salvar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
}
