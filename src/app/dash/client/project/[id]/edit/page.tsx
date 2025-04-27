import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { UpdateProjectForm } from "../(components)/update-project-form";

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const entity = await getTolinerAsEntity();
    const projectId = (await params).id;
    const project = entity?.projects?.find(
        (project) => project.id == projectId
    );
    return (
        <div className='flex justify-center w-full'>
            <UpdateProjectForm project={project} />
        </div>
    );
}
