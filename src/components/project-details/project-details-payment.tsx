import { EditProjectPaymentButton } from "../dash/edit-project-payment-button";

interface IProjectDetailsPaymentProps {
    paymentDependencies?: {
        projectId: string;
        ownerId: string;
    };
    ammount?: number;
    dueDate?: string;
    isEditable?: boolean;
    imTheOwner?: boolean;
}
export function ProjectDetailsPayment({
    paymentDependencies,
    ammount,
    dueDate,
    imTheOwner,
}: IProjectDetailsPaymentProps) {
    return (
        <div className='flex flex-col w-full mt-2'>
            <p className='font-semibold text-lg'>Pagamento</p>
            <div className='flex justify-between border border-gray-200 shadow-sm rounded-lg p-4 items-start w-full'>
                <div className='flex flex-col gap-2 flex-1'>
                    <div className='flex flex-col gap-2'>
                        <p className='flex justify-between'>
                            <span>Montante:</span> {ammount ?? "Não Efetuado"}{" "}
                        </p>
                        <p className='flex justify-between'>
                            <span>Prazo do Projeto:</span>{" "}
                            {dueDate ?? "Não Definido"}{" "}
                        </p>
                    </div>
                </div>

                {paymentDependencies && imTheOwner && (
                    <EditProjectPaymentButton
                        paymentDependencies={paymentDependencies}
                    />
                )}
            </div>
        </div>
    );
}
