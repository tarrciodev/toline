import { getProjectsBySubscription } from "@/actions/projects/get-projects-by-subscription";
import { getUserAsEntity } from "@/actions/users/get-entity";
import { FreelancerProjectsFilter } from "@/components/freelancers/freelancer-projects-filter";
import { Project } from "@/components/project";

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ status: string }>;
}) {
    const status = (await searchParams).status;
    const freelancer = await getUserAsEntity();

    if (status == "sent") {
        const subscriptionsAsId = freelancer?.subscriptions?.map(
            (subscription) => subscription.id
        );
        const sentProposals = await getProjectsBySubscription(
            subscriptionsAsId ?? []
        );

        return (
            <main className='flex flex-col sm:flex-row py-3 gap-4 w-full'>
                <FreelancerProjectsFilter status={status} />
                <div className='flex flex-col flex-1 gap-2'>
                    {sentProposals?.map((project) => (
                        <Project key={project.id} project={project} />
                    ))}
                </div>
            </main>
        );
    }

    const accceptedProposals = freelancer?.projects?.filter(
        (project) => project.status != "Completado"
    );

    const concludedProjects = freelancer?.projects?.filter(
        (project) => project.status == "Completado"
    );

    return (
        <main className='flex flex-col sm:flex-row py-3 gap-4 w-full '>
            <FreelancerProjectsFilter status={status} />
            <div className='flex flex-col flex-1 gap-2'>
                {status == "accepted" && (
                    <>
                        {accceptedProposals?.map((project) => (
                            <Project key={project.id} project={project} />
                        ))}
                    </>
                )}

                {status == "concluded" && (
                    <>
                        {concludedProjects?.map((project) => (
                            <Project key={project.id} project={project!} />
                        ))}
                    </>
                )}
            </div>
        </main>
    );
}
