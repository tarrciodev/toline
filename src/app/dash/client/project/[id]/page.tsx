import { getUserAsEntity } from "@/actions/users/get-entity";
import { DashHeader } from "@/components/dash-header";
import { ProjectSideBar } from "@/components/dash/project-details";
import { Subscriber } from "@/components/subscriber";
import { Badge } from "@/components/ui/badge";

export default async function MyProject({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const response = await getUserAsEntity();
    const entity = response.data;
    const projectId = (await params).id;
    const project = entity?.projects?.find(
        (project) => project.id == projectId
    );

    if (!project) {
        return <p>Nenhum projeto foi encontrado</p>;
    }

    const subscriptions = project.subscriptions?.filter(
        (subscription) => subscription.freelancer.id !== project.freelancerId
    );

    const projectDependencies = {
        projectId: project.id,
        freelancerId: project.freelancerId as string,
        clientId: entity?.id as string,
        paymentId: project.payment?.id as string,
    };

    return (
        <div className='h-[100dvh]'>
            <DashHeader />
            <div className='px-56 flex py-6 gap-6'>
                <div className='flex flex-col flex-1 gap-2'>
                    <h1 className='text-blue-700 font-semibold text-2xl'>
                        <strong>{project.name}</strong>
                    </h1>
                    <div className='flex gap-2'>
                        <p>
                            Categoria:{" "}
                            <span className='font-semibold'>
                                {project.category}
                            </span>
                        </p>
                        {project.subcategory && (
                            <p>
                                Subcategoria:{" "}
                                <span className='font-semibold'>
                                    {project.subcategory}
                                </span>
                            </p>
                        )}
                        <p>
                            Publicado:{" "}
                            <span className='font-semibold'>
                                {project.createdAt}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className='font-semibold'>Descrição:</span>{" "}
                            {project.description}
                        </p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Skills</p>
                        <div className='flex gap-2'>
                            {project.skills?.map((skill) => (
                                <Badge key={skill.id}>{skill.name}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-2 justify-between mt-2'>
                        {entity?.type === "freelancer" && (
                            <p>
                                Proprietário do Projeto:{" "}
                                <span>{project?.owner?.name}</span>
                            </p>
                        )}
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='font-semibold text-xl'>Propostas</p>
                        <div className='space-y-2'>
                            {subscriptions?.map((subscription) => (
                                <Subscriber
                                    key={subscription.id}
                                    subscription={subscription}
                                    projectId={project.id}
                                    entityId={entity?.id as string}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-[30dvw]'>
                    <ProjectSideBar
                        projectDependencies={projectDependencies}
                        project={project}
                    />
                </div>
            </div>
        </div>
    );
}
