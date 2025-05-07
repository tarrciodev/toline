import { EditProjectQoutationButton } from "../dash/edit-project-Qoutation-button";

export function ProjectDetails({
    ammount,
    description,
    quotationDependencies,
    projectStatus,
    imTheOwner,
}: {
    ammount?: number;
    description?: string;
    quotationDependencies?: {
        projectId: string;
        ownerId: string;
    };
    projectStatus?: "onGoing" | "created" | "completed";
    imTheOwner?: boolean;
}) {
    const statusConfig = {
        onGoing: {
            baseClass: "bg-blue-100 text-blue-600",
        },
        Concluido: {
            baseClass: "bg-green-100 text-green-600",
        },
        created: {
            baseClass: "bg-red-100 text-red-600",
        },
    };
    return (
        <div className='flex flex-col pt-4'>
            <div className='flex justify-between items-start mb-3'>
                <p className='font-semibold text-lg'>Detalhes do projeto</p>
                {projectStatus && (
                    <p
                        className={`text-sm font-semibold py-1 px-3 rounded-xl ${statusConfig[projectStatus as keyof typeof statusConfig]?.baseClass}`}
                    >
                        {projectStatus}
                    </p>
                )}
            </div>
            <div className='flex border border-gray-200 shadow-sm rounded-lg p-4 justify-between items-start'>
                <div className='flex flex-col gap-2 flex-1'>
                    <p className='flex justify-between'>
                        <span className='font-semibold'>Orçamento:</span>{" "}
                        {ammount ?? "Sem Orçamento"}
                    </p>
                    {description && (
                        <p className=''>
                            <span className='font-semibold'>Descrição:</span>{" "}
                            {description}
                        </p>
                    )}
                </div>
                {quotationDependencies && imTheOwner && (
                    <EditProjectQoutationButton
                        quotationDependencies={quotationDependencies}
                    />
                )}
            </div>
        </div>
    );
}
