import { ProjectFullProps } from "@/store/entity";
import { ChatWithProjectOwner } from "../dash/chat/chat-with-project-owner";
import { MarkProjectAsConcluded } from "./mark-as-concluded";
import { ProjectDetails } from "./project-detail";
import { ProjectDetailsFreelancer } from "./project-detail-freelancer";
import { ProjectDetailsPayment } from "./project-details-payment";
import { ProjectDetailsRoot } from "./project-details-root";
import { SubscriptionActions } from "./subscription-actions";

export type ProjectDependencies = {
    projectId: string;
    freelancerId: string;
    ownerId: string;
};

type SubscriberAsEntity = {
    id: string;
    type: "freelancer" | "client";
};

export function ProjectSideBar({
    projectDependencies,
    project,
    entity,
}: {
    projectDependencies?: ProjectDependencies;
    project: ProjectFullProps;
    entity?: SubscriberAsEntity;
}) {
    const dependencies = {
        projectId: projectDependencies?.projectId as string,
        ownerId: projectDependencies?.ownerId as string,
    };

    const imSubscribed =
        project.subscriptions?.some(
            (subscription) => subscription.freelancer.id === entity?.id
        ) ?? false;

    const subscriber = project.freelancer;

    return (
        <ProjectDetailsRoot>
            <ProjectDetails
                ammount={project.quotation?.ammount}
                description={project.quotation?.description}
                quotationDependencies={dependencies}
                isEditable={entity?.type == "client"}
            />
            <ProjectDetailsPayment
                ammount={project.payment?.ammount}
                dueDate={project.dueDate}
                paymentDependencies={dependencies}
                isEditable={entity?.type == "client"}
            />
            {entity?.type == "freelancer" && (
                <div className='flex flex-col gap-1'>
                    <ChatWithProjectOwner owner={project.owner!} />
                    <SubscriptionActions
                        project={{
                            id: project.id,
                            freelancerId: project?.freelancerId,
                        }}
                        freelancerId={entity.id}
                        imSubscribed={imSubscribed}
                    />
                </div>
            )}
            {entity?.type == "client" && (
                <div className='flex flex-col gap-3'>
                    <ProjectDetailsFreelancer
                        project={{
                            id: project.id,
                            owner: { id: project.owner!.id! },
                        }}
                        freelancer={subscriber}
                    />
                    <MarkProjectAsConcluded
                        project={{
                            id: project.id,
                            freelancerId: project.freelancer?.id,
                            ownerId: project.owner!.id,
                        }}
                    />
                </div>
            )}
        </ProjectDetailsRoot>
    );
}
