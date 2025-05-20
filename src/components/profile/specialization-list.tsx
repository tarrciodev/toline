"use client";

import SpecializationItem from "./specialization-item";
export interface ISkills {
    id: string;
    name: string;
}

interface ISpecializationListProps {
    specialization: { id: string; name: string }[];
    displaySelectionBox: boolean;
    tolinerId: string;
}

export function SpecializationList({
    specialization,
    displaySelectionBox,
    tolinerId,
}: ISpecializationListProps) {
    return (
        <div>
            <div className='flex gap-1 flex-wrap'>
                {specialization.map((specialization) => (
                    <SpecializationItem
                        key={specialization.id}
                        tolinerId={tolinerId}
                        specialization={specialization}
                        displaySelectionBox={displaySelectionBox}
                    />
                ))}
            </div>
        </div>
    );
}
