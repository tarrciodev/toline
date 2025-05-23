"use client";
import { getProjectsBySubscription } from "@/actions/projects/get-projects-by-subscription";
import { FreelancerProjectsFilter } from "@/components/freelancers/freelancer-projects-filter";
import { Project } from "@/components/project";
import { EntityProps } from "@/store/entity";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { NoProjectFound } from "./no-project";

export default function ProjectsContainer({
    freelancer,
}: {
    freelancer: EntityProps;
}) {
    const searchparams = useSearchParams();
    const status = (searchparams.get("status") as string) ?? "sent";
    const { data: sentProposals } = useQuery({
        queryKey: ["sentProposals"],
        queryFn: async () => {
            const subscriptionsAsId = freelancer?.subscriptions?.map(
                (subscription) => subscription.id
            );
            return await getProjectsBySubscription(subscriptionsAsId ?? []);
        },
    });
    if (status == "sent") {
        return (
            <main className='flex flex-col sm:flex-row sm:py-3 gap-2 sm:gap-4 w-full -mt-4 sm:-mt-0'>
                <FreelancerProjectsFilter />
                {(sentProposals ?? []).length > 0 ? (
                    <div className='flex flex-col flex-1 gap-2 mt-24 sm:mt-0'>
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
            <FreelancerProjectsFilter />
            <div className='flex flex-col flex-1 gap-2 mt-24 sm:mt-0'>
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
