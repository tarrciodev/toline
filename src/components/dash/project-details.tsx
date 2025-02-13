import { ProjectFullProps } from "@/actions/users/get-entity";
import { MessagesSquare, Quote } from "lucide-react";
import Link from "next/link";
import { ProjectSuscriptionForm } from "../forms/project-suscription";
import { SelectedFreelancer } from "../selected-freelancer";
import { Card, CardContent } from "../ui/card";
import { UnsubscribeToProject } from "../unsubscribe-to-project";
import { EditProjectQoutationButton } from "./edit-project-Qoutation-button";
import { EditProjectPaymentButton } from "./edit-project-payment-button";

export type ProjectDependencies = {
    projectId: string;
    freelancerId: string;
    clientId: string;
    paymentId?: string;
    qoutationId?: string;
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
    const quotationDependencies = {
        projectId: projectDependencies?.projectId as string,
        quotationId: projectDependencies?.qoutationId as string,
        clientId: projectDependencies?.clientId as string,
    };

    const paymentDependencies = {
        projectId: projectDependencies?.projectId as string,
        paymentId: projectDependencies?.paymentId as string,
        clientId: projectDependencies?.clientId as string,
    };

    const imSubscribed = project.subscriptions?.some(
        (subscription) => subscription.freelancer.id === entity?.id
    );

    const subscriber = project.subscriptions?.find(
        (subscription) =>
            subscription.freelancer.id === projectDependencies?.freelancerId
    );

    return (
        <Card>
            <CardContent>
                <div className='flex flex-col pt-4'>
                    <p className='font-semibold text-lg'>Detalhes do projeto</p>
                    <div className='flex border border-gray-200 shadow rounded-lg p-4 justify-between items-start'>
                        <div className='flex flex-col gap-2 flex-1'>
                            <p className='flex justify-between'>
                                <span className='font-semibold'>Status:</span>{" "}
                                Não iniciado
                            </p>
                            <p className='flex justify-between'>
                                <span className='font-semibold'>
                                    Orçamento:
                                </span>{" "}
                                {project?.quotation?.ammount ?? "Sem Orçamento"}
                            </p>
                            {project.quotation?.description && (
                                <p className=''>
                                    <span className='font-semibold'>
                                        Descrição:
                                    </span>{" "}
                                    {project.quotation?.description}
                                </p>
                            )}
                        </div>
                        {projectDependencies && (
                            <EditProjectQoutationButton
                                quotationDependencies={quotationDependencies}
                            />
                        )}
                    </div>
                </div>
                <div className='flex flex-col w-full mt-2'>
                    <p className='font-semibold text-lg'>Pagamento</p>
                    <div className='flex justify-between border border-gray-200 shadow rounded-lg p-4 items-start w-full'>
                        <div className='flex flex-col gap-2 flex-1'>
                            <div className='flex flex-col gap-2'>
                                <p className='flex justify-between'>
                                    <span>Montante:</span>{" "}
                                    {project?.payment?.ammount ??
                                        "Não Efetuado"}{" "}
                                </p>
                                <p className='flex justify-between'>
                                    <span>Prazo do Projeto:</span>{" "}
                                    {project?.dueDate ?? "Não Definido"}{" "}
                                </p>
                            </div>
                        </div>
                        {projectDependencies && (
                            <EditProjectPaymentButton
                                paymentDependencies={paymentDependencies}
                            />
                        )}
                    </div>
                </div>
                {projectDependencies ? (
                    <div className='flex justify-between my-2 border border-gary-200 shadow rounded-lg p-4'>
                        <span>Mensagens do Projeto</span>{" "}
                        <div>
                            <MessagesSquare />
                        </div>
                    </div>
                ) : (
                    <>
                        {entity?.type === "freelancer" && (
                            <Link
                                href='/'
                                className='flex justify-center gap-2 my-2 border border-gary-200 shadow rounded-lg p-2 bg-blue-700 hover:bg-blue-800 text-blue-50'
                            >
                                <span>Converçar com o Proprietário</span>{" "}
                                <div>
                                    <MessagesSquare />
                                </div>
                            </Link>
                        )}
                    </>
                )}

                {entity?.type === "freelancer" && (
                    <>
                        {project.freelancerId ? (
                            <div className='border border-gray-200 shadow rounded-lg p-4 flex items-start justify-between text-red-600'>
                                A inscrição para este projeto está encerrada{" "}
                                <Quote />
                            </div>
                        ) : (
                            <>
                                {imSubscribed ? (
                                    <UnsubscribeToProject
                                        projectId={project.id}
                                        freelancerId={entity.id}
                                    />
                                ) : (
                                    <ProjectSuscriptionForm
                                        freelancerId={entity.id}
                                        projectId={project.id}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}

                {projectDependencies && (
                    <div>
                        <p className='font-semibold text-lg'>Freelancer</p>

                        {subscriber ? (
                            <SelectedFreelancer
                                entityId={project.owner?.id as string}
                                projectId={project.id}
                                subscription={subscriber}
                            />
                        ) : (
                            <Card>
                                <CardContent>
                                    <div className='p-4'>
                                        Quando você iniciar um projeto, você
                                        pode selecionar um freelancer para o seu
                                        projeto. Eles serão responsáveis por
                                        gerenciar o projeto e fazer as entregas.
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
