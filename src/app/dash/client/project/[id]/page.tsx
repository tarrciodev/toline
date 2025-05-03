import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { ProjectSideBar } from "@/components/project-details";
import { Subscriber } from "@/components/subscriber";
import { Badge } from "@/components/ui/badge";
import { getCookieStore } from "@/utils/cookie-store";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteProjectModal } from "./(components)/delete-project-modal";

export default async function MyProject({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const entity = await getTolinerAsEntity();
    const projectId = (await params).id;
    const project = entity?.projects?.find(
        (project) => project.id == projectId
    );

    if (!project) {
        return <p>Nenhum projeto foi encontrado</p>;
    }

    const subscriptions = project.subscriptions
        ?.filter(
            (subscription) => subscription.toliner.id !== project.freelancerId
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

    const logged_as = (await getCookieStore("logged_as")) as
        | "client"
        | "freelancer";

    const imTheOwner = project.owner?.id === entity?.id;

    return (
        <main className='flex gap-6 p-4 min-h-screen'>
            <div className='flex flex-col flex-1 gap-2 bg-white shadow relative'>
                <div className='flex gap-3 absolute top-2 right-5 bg-gray-200 rounded-xl px-3 py-2'>
                    <Link href={`/dash/client/project/${project.id}/edit`}>
                        <span className='text-blue-700'>
                            <Edit />
                        </span>
                    </Link>
                    <DeleteProjectModal
                        projectId={project.id}
                        ownerId={entity?.id as string}
                    />
                </div>
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
                        <div>
                            <span className='font-semibold'>Descrição:</span>{" "}
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: project.description,
                                }}
                            ></p>
                        </div>
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
                                ownerId={entity?.id as string}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-[30dvw] sticky top-1 self-start'>
                <ProjectSideBar
                    projectDependencies={projectDependencies}
                    project={project}
                    entity={entity}
                    logged_as={logged_as}
                    imTheOwner={imTheOwner}
                />
            </div>
        </main>
    );
}
