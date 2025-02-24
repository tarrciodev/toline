import { Quote } from "lucide-react";
import { ProjectSuscriptionForm } from "../forms/project-suscription";
import { UnsubscribeToProject } from "../unsubscribe-to-project";

export function SubscriptionActions({
    project,
    freelancerId,
    imSubscribed,
}: {
    project: { id: string; freelancerId?: string };
    freelancerId: string;
    imSubscribed: boolean;
}) {
    return (
        <div>
            {project.freelancerId ? (
                <div className='border border-gray-200 shadow-sm rounded-lg p-4 flex items-start justify-between text-red-600'>
                    A inscrição para este projeto está encerrada <Quote />
                </div>
            ) : (
                <>
                    {imSubscribed ? (
                        <UnsubscribeToProject
                            projectId={project.id}
                            freelancerId={freelancerId}
                        />
                    ) : (
                        <ProjectSuscriptionForm
                            projectId={project.id}
                            freelancerId={freelancerId}
                        />
                    )}
                </>
            )}
        </div>
    );
}
