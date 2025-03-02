import { getUserAsEntity } from "@/actions/users/get-entity";
import { ProjectSideBar } from "@/components/project-details";
import { Subscriber } from "@/components/subscriber";
import { Badge } from "@/components/ui/badge";

export default async function MyProject({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const entity = await getUserAsEntity();
    const projectId = (await params).id;
    const project = entity?.projects?.find(
        (project) => project.id == projectId
    );

    if (!project) {
        return <p>Nenhum projeto foi encontrado</p>;
    }

    const subscriptions = project.subscriptions
        ?.filter(
            (subscription) =>
                subscription.freelancer.id !== project.freelancerId
        )
        .map((subscription) => {
            return {
                ...subscription,
                estimatedTime: subscription.estimatedTime ?? "",
                requiredInformations: subscription.requiredInformations ?? "",
                quotation: subscription.quotation ?? 0,
                similarExperiences: subscription.similarExperiences ?? "",
            };
        });

    const projectDependencies = {
        projectId: project.id,
        freelancerId: project.freelancerId as string,
        ownerId: project.owner?.id as string,
    };

    return (
        <main className='flex gap-4 w-full flex-1'>
            <div className='flex flex-col flex-1 gap-2'>
                <div className='flex flex-col gap-2 p-4 bg-white'>
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
                </div>
                <div className='flex flex-col gap-6 bg-gray-50 p-4'>
                    <p className='font-semibold text-xl'>Propostas</p>
                    <div className='flex flex-col gap-1'>
                        {subscriptions?.map((subscription) => (
                            <Subscriber
                                key={subscription.id}
                                subscription={subscription}
                                projectId={project.id}
                                ownerId={entity?.userId as string}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-[30dvw]'>
                <ProjectSideBar
                    projectDependencies={projectDependencies}
                    project={project}
                    entity={entity}
                />
            </div>
        </main>
    );
}
