import { getProjectById } from "@/actions/projects/get-project-by-id";
import { getUser } from "@/actions/users/get-user";
import { DashHeader } from "@/components/dash-header";
import { ProjectSideBar } from "@/components/dash/project-details";
import { Badge } from "@/components/ui/badge";

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const response = await getProjectById(id);
    const project = response.project;

    const user = await getUser();
    const entity = {
        id: user.userId,
        type: user.type as "freelancer" | "client",
    };

    return (
        <div>
            <DashHeader />
            <div className='flex justify-between px-56 py-8 gap-6'>
                <div className='flex flex-col flex-1'>
                    <div className='space-y-4'>
                        <h1 className='text-4xl font-bold'>{project?.name}</h1>
                        <p>{project?.description}</p>
                        <div className='flex gap-2'>
                            <p>Status: {project?.status}</p>
                            <p>Data de Publicaçao: {project?.createdAt}</p>
                            <p>Data de Atualizaçao: {project?.updatedAt}</p>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h2 className='text-2xl font-semibold py-2'>
                            Habilidades Desejadas
                        </h2>
                        <div className='flex gap-1'>
                            {project?.skills?.map((skill) => (
                                <Badge key={skill?.id}>{skill?.name}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-[30dvw]'>
                    <ProjectSideBar project={project!} entity={entity} />
                </div>
            </div>
        </div>
    );
}
