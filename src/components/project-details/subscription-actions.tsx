import { Quote } from "lucide-react";
import { ProjectSuscriptionForm } from "../forms/project-suscription";
import { UnsubscribeToProject } from "../unsubscribe-to-project";

export function SubscriptionActions({
    project,
    tolinerId,
    imSubscribed,
}: {
    project: { id: string; freelancerId?: string };
    tolinerId: string;
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
                            tolinerId={tolinerId}
                        />
                    ) : (
                        <ProjectSuscriptionForm
                            projectId={project.id}
                            tolinerId={tolinerId}
                        />
                    )}
                </>
            )}
        </div>
    );
}
