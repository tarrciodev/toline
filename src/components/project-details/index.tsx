"use client";
import { ProjectFullProps } from "@/store/entity";
import { CanIf } from "../can-if";
import { ChatWithEntity } from "../dash/chat/chat-with-entity";
import { MarkProjectAsConcluded } from "./mark-as-concluded";
import { PaymentButton } from "./payment-button";
import { PaymentCard } from "./payment-card";
import { ProjectDetails } from "./project-detail";
import { ProjectDetailsFreelancer } from "./project-detail-freelancer";
import { ProjectDueDate } from "./project-details-due-date";
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
    logged_as,
    imTheOwner,
}: {
    projectDependencies?: ProjectDependencies;
    project: ProjectFullProps;
    entity?: SubscriberAsEntity;
    logged_as: "client" | "freelancer";
    imTheOwner?: boolean;
}) {
    const dependencies = {
        projectId: projectDependencies?.projectId as string,
        ownerId: projectDependencies?.ownerId as string,
    };

    const imSubscribed =
        project.subscriptions?.some(
            (subscription) => subscription.toliner.id === entity?.id
        ) ?? false;

    const subscriber = project.freelancer;

    const projectStatus = project.status as "onGoing" | "completed" | "created";

    return (
        <ProjectDetailsRoot>
            <ProjectDetails
                ammount={project.quotation?.ammount}
                description={project.quotation?.description}
                quotationDependencies={dependencies}
                projectStatus={projectStatus}
                imTheOwner={imTheOwner}
            />
            <ProjectDueDate
                dueDate={project.dueDate}
                dependencies={dependencies}
                imTheOwner={imTheOwner as boolean}
            />
            {logged_as == "freelancer" && (
                <CanIf
                    isVerified
                    fallback={
                        <div className='bg-red-100 p-4 rounded my-2'>
                            <p className='text-red-600'>
                                Apénas freelancers verifiacados podem enviar
                                propostas em projetos
                            </p>
                        </div>
                    }
                >
                    <div className='flex flex-col gap-1'>
                        <ChatWithEntity
                            entityId={project?.owner?.userId as string}
                            entityType='client'
                        />
                        <SubscriptionActions
                            project={{
                                id: project.id,
                                freelancerId: project?.freelancerId,
                            }}
                            tolinerId={entity?.id as string}
                            imSubscribed={imSubscribed}
                        />
                    </div>
                </CanIf>
            )}
            {logged_as == "client" && imTheOwner && (
                <div className='flex flex-col gap-3'>
                    <ProjectDetailsFreelancer
                        project={{
                            status: project.status as "onGoing" | "completed",
                            id: project.id,
                            owner: { id: project.owner!.id! },
                        }}
                        freelancer={subscriber}
                    />
                    {project.freelancerId && (
                        <MarkProjectAsConcluded
                            project={{
                                status: project.status as
                                    | "onGoing"
                                    | "completed",
                                id: project.id,
                                freelancerId: project?.freelancerId,
                                ownerId: project.owner!.id!,
                            }}
                        />
                    )}
                </div>
            )}
            {!project.payment && project.freelancerId && (
                <PaymentButton>
                    <PaymentCard projectId={project.id} />
                </PaymentButton>
            )}
        </ProjectDetailsRoot>
    );
}
