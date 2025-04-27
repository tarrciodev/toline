import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Project } from "@/components/entity/project";

export default async function Page() {
    const entity = await getTolinerAsEntity();
    const projects = entity?.projects;

    return (
        <main className='flex gap-4 w-full'>
            <div className='flex flex-col flex-1 gap-1'>
                {projects?.map((project) => (
                    <Project
                        key={project.id}
                        project={project}
                        entityType='client'
                    />
                ))}
            </div>
            <div className='w-[30dvw] hidden sm:flex'></div>
        </main>
    );
}
