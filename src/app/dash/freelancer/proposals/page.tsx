import { getProjectsBySubscription } from "@/actions/projects/get-projects-by-subscription";
import { getUserAsEntity } from "@/actions/users/get-entity";
import { DashHeader } from "@/components/dash-header";
import { FreelancerProjectsFilter } from "@/components/freelancers/freelancer-projects-filter";
import { Project } from "@/components/project";

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ status: string }>;
}) {
    const status = (await searchParams).status;
    const response = await getUserAsEntity();
    const freelancer = response.data;

    if (status == "sent") {
        const subscriptionsAsId = freelancer?.subscriptions?.map(
            (subscription) => subscription.id
        );
        const sentProposals = await getProjectsBySubscription(
            subscriptionsAsId ?? []
        );

        return (
            <div className='min-h-screen'>
                <DashHeader />
                <div className='px-56 flex py-3 gap-4'>
                    <FreelancerProjectsFilter status={status} />
                    <div className='flex flex-col flex-1 gap-2'>
                        {sentProposals.map((project) => (
                            <Project key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const accceptedProposals = freelancer?.projects?.filter(
        (project) => project.status != "Completado"
    );

    const concludedProjects = freelancer?.projects?.filter(
        (project) => project.status == "Completado"
    );

    return (
        <div className='min-h-screen'>
            <DashHeader />
            <div className='px-56 flex py-3 gap-4'>
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
            </div>
        </div>
    );
}
