import { create } from "zustand";

interface ISystemSkillsProps {
    id: string;
    name: string;
}
interface ISystemSkillsStorePros {
    systemSkills: ISystemSkillsProps[] | null;
    setSystemSkills: (systemSkills: ISystemSkillsProps[]) => void;
}

export const useSystemSkillsStore = create<ISystemSkillsStorePros>()((set) => ({
    systemSkills: null,
    setSystemSkills: (systemSkills: ISystemSkillsProps[]) =>
        set({ systemSkills }),
}));
