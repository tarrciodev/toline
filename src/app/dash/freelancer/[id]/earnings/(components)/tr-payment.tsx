import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { formatCurrency } from "@/utils/format-currency";

export default function TrPayment({
    payment,
}: {
    payment: FreelancerPayments;
}) {
    const statusPayment = {
        resolved: {
            text: "Pago",
            css: "bg-green-100 text-green-800",
        },
        pending: {
            text: "Processando",
            css: "bg-yellow-100 text-yellow-800",
        },
    };

    return (
        <tr>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {payment?.project?.name}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {payment?.client?.name}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {formatCurrency(payment?.ammount)}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {new Date(payment?.createdAt).toLocaleDateString("pt-BR")}
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
                <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusPayment[payment?.status as keyof typeof statusPayment].css}`}
                >
                    {
                        statusPayment[
                            payment?.status as keyof typeof statusPayment
                        ].text
                    }
                </span>
            </td>
        </tr>
    );
}
