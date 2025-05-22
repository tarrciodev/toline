import { EditProjectDueDateButton } from "../dash/edit-project-due-date";

interface IProjectDetailsPaymentProps {
    dependencies?: {
        projectId: string;
        ownerId: string;
    };
    ammount?: number;
    dueDate?: string;
    isEditable?: boolean;
    imTheOwner?: boolean;
}
export function ProjectDueDate({
    dependencies,
    dueDate,
    imTheOwner,
}: IProjectDetailsPaymentProps) {
    return (
        <div className='flex flex-col w-full mt-2'>
            <p className='font-semibold text-lg'>Prazo para entrega</p>
            <div className='flex justify-between border border-gray-200 shadow-sm rounded-lg p-4 items-start w-full'>
                {dueDate ?? "Não Definido"}{" "}
                {dependencies && imTheOwner && (
                    <EditProjectDueDateButton dependencies={dependencies} />
                )}
            </div>
        </div>
    );
}
