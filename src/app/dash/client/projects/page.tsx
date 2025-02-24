import { getUserAsEntity } from "@/actions/users/get-entity";
import { DashHeader } from "@/components/dash-header";
import { Project } from "@/components/entity/project";

export default async function Page() {
    const entity = await getUserAsEntity();
    const projects = entity?.projects;
    console.log({ projects });
    return (
        <div className='h-[100dvh]'>
            <DashHeader />
            <div className='px-4 sm:px-56 flex py-3 w-full gap-6'>
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
            </div>
        </div>
    );
}
