"use client";

import { updateFreelancerSkills } from "@/actions/freelancer/update-freelancer-skills";
import { useSystemSkillsStore } from "@/store/system-skills";
import { useState, useTransition } from "react";
import { Loader } from "../loader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import SkillItem from "./skill-item";
export interface ISkills {
    id: string;
    name: string;
    categoryId: string;
    description?: string;
    subcategoryId?: string;
    tag?: string;
}

interface ISkillListProps {
    skills: ISkills[];
    displaySelectionBox: boolean;
    toggleDisplaySelectionBox: () => void;
    freelancerId: string;
}

export function SkillsList({
    skills,
    displaySelectionBox,
    toggleDisplaySelectionBox,
    freelancerId,
}: ISkillListProps) {
    const [selectedSkills, setSelectedSkills] = useState<ISkills[]>([]);

    const { systemSkills } = useSystemSkillsStore();

    function handleMarkToDelete(skill: ISkills) {
        setSelectedSkills((prev) => {
            const alreadySelected = prev.find((item) => item.id === skill.id);
            if (alreadySelected) {
                return prev.filter((item) => item.id !== skill.id);
            }

            return [...prev, skill];
        });
    }

    const [loading, startTransition] = useTransition();
    async function handleSave() {
        startTransition(async () => {
            try {
                const data = await updateFreelancerSkills({
                    freelancerId,
                    skills: selectedSkills.map((skill) => skill.name),
                    userSkills: skills,
                    systemSkills: systemSkills ?? [],
                    action: "remove",
                });

                console.log({
                    data,
                    skills,
                    systemSkills,
                    selectedSkills: selectedSkills.map((skill) => skill.id),
                });
            } catch (error) {
                console.error("Failed to save:", error);
            }
        });
    }

    function toggleSelectionBox() {
        setSelectedSkills([]);
        toggleDisplaySelectionBox();
    }
    return (
        <>
            {displaySelectionBox && (
                <div className='border border-gray-200 rounded pt-4 px-4'>
                    <div className='flex gap-2'>
                        {skills.map((skill) => (
                            <SkillItem
                                key={skill.id}
                                skill={skill}
                                selectedSkills={selectedSkills}
                                handleMarkToDelete={handleMarkToDelete}
                            />
                        ))}
                    </div>
                    <div className='flex justify-between items-end pt-3'>
                        <div className='flex gap-2 my-3 py-0 w-full items-end justify-between '>
                            <span className='text-sm text-red-600'>
                                Selecione se desejar remover
                            </span>
                            <div className='flex justify-end gap-2'>
                                <Button
                                    size='sm'
                                    className='bg-red-700 hover:bg-red-600'
                                    onClick={toggleSelectionBox}
                                >
                                    cancelar
                                </Button>
                                <Button
                                    size='sm'
                                    variant='outline'
                                    disabled={loading}
                                    onClick={handleSave}
                                >
                                    {loading && <Loader />}Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {displaySelectionBox || (
                <div>
                    <div className='flex gap-2'>
                        {skills.map((skill) => (
                            <Badge key={skill.id}>{skill.name}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
