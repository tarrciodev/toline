import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";

export function TrPaymentItem({ payment }: { payment: FreelancerPayments }) {
    const statusTranslation = {
        completed: "Concluído",
        pending: "Pendente",
        failed: "Falhou",
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const statusClasses = {
        completed: "bg-green-100 text-green-600",
        pending: "bg-yellow-100 text-yellow-600",
        failed: "bg-red-100 text-red-600",
    };
    return (
        <tr key={payment.id} className='hover:bg-gray-50'>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {payment.createdAt}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {payment?.project?.name}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {payment.freelancer?.name}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {formatCurrency(payment.ammount)}
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[payment.status as keyof typeof statusClasses]}`}
                >
                    {
                        statusTranslation[
                            payment.status as keyof typeof statusTranslation
                        ]
                    }
                </span>
            </td>
        </tr>
    );
}
