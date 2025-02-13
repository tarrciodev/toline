import { Badge } from "../ui/badge";
import { ISkills } from "./skills-list";

interface ISkillItemProps {
    selectedSkills: ISkills[];
    skill: ISkills;
    handleMarkToDelete: (skill: ISkills) => void;
}

export default function SkillItem({
    skill,
    handleMarkToDelete,
    selectedSkills,
}: ISkillItemProps) {
    const isSelected = selectedSkills.find((item) => item.id === skill.id);
    function handleDelete() {
        handleMarkToDelete(skill);
    }
    return (
        <div onClick={handleDelete} className='cursor-pointer'>
            <Badge variant={isSelected ? "destructive" : "default"}>
                {skill.name}
            </Badge>
        </div>
    );
}
