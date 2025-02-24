import { EditProjectQoutationButton } from "../dash/edit-project-Qoutation-button";

export function ProjectDetails({
    ammount,
    description,
    isEditable,
    quotationDependencies,
}: {
    ammount?: number;
    description?: string;
    quotationDependencies?: {
        projectId: string;
        ownerId: string;
    };
    isEditable?: boolean;
}) {
    return (
        <div className='flex flex-col pt-4'>
            <p className='font-semibold text-lg'>Detalhes do projeto</p>
            <div className='flex border border-gray-200 shadow-sm rounded-lg p-4 justify-between items-start'>
                <div className='flex flex-col gap-2 flex-1'>
                    <p className='flex justify-between'>
                        <span className='font-semibold'>Status:</span> Não
                        iniciado
                    </p>
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
                {isEditable && quotationDependencies && (
                    <EditProjectQoutationButton
                        quotationDependencies={quotationDependencies}
                    />
                )}
            </div>
        </div>
    );
}
