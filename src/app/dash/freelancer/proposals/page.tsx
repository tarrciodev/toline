import { getProjectsBySubscription } from "@/actions/projects/get-projects-by-subscription";
import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { FreelancerProjectsFilter } from "@/components/freelancers/freelancer-projects-filter";
import { Project } from "@/components/project";
import { NoProjectFound } from "./(components)/no-project";

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ status: string }>;
}) {
    const status = (await searchParams).status;
    const freelancer = await getTolinerAsEntity();

    if (status == "sent") {
        const subscriptionsAsId = freelancer?.subscriptions?.map(
            (subscription) => subscription.id
        );
        const sentProposals = await getProjectsBySubscription(
            subscriptionsAsId ?? []
        );

        return (
            <main className='flex flex-col sm:flex-row sm:py-3 gap-2 sm:gap-4 w-full -mt-4 sm:-mt-0'>
                <FreelancerProjectsFilter status={status} />
                {(sentProposals ?? []).length > 0 ? (
                    <div className='flex flex-col flex-1 gap-2'>
                        {sentProposals?.map((project) => (
                            <Project key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <NoProjectFound />
                )}
            </main>
        );
    }

    const accceptedProposals = freelancer?.projectsFreelanced?.filter(
        (project) => project.status != "completed"
    );

    const concludedProjects = freelancer?.projectsFreelanced?.filter(
        (project) => project.status == "completed"
    );

    return (
        <main className='flex flex-col sm:flex-row py-3 gap-4 w-full '>
            <FreelancerProjectsFilter status={status} />
            <div className='flex flex-col flex-1 gap-2'>
                {status == "accepted" && (
                    <>
                        {(accceptedProposals ?? []).length > 0 ? (
                            <>
                                {accceptedProposals?.map((project) => (
                                    <Project
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                            </>
                        ) : (
                            <NoProjectFound />
                        )}
                    </>
                )}

                {status == "concluded" && (
                    <>
                        {(concludedProjects ?? []).length > 0 ? (
                            <>
                                {concludedProjects?.map((project) => (
                                    <Project
                                        key={project.id}
                                        project={project!}
                                    />
                                ))}
                            </>
                        ) : (
                            <NoProjectFound />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
