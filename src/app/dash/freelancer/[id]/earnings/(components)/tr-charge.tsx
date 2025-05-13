import { Charge } from "@/actions/toliners/get-charges";
import { formatCurrency } from "@/utils/format-currency";

export default function TrCharge({ charge }: { charge: Charge }) {
    const chargeStatus = {
        resolved: {
            text: "Resolvido",
            css: "bg-green-100 text-green-800",
        },
        pending: {
            text: "Processando",
            css: "bg-yellow-100 text-yellow-800",
        },
        rejected: {
            text: "Rejeitado",
            css: "bg-red-100 text-red-800",
        },
    };

    return (
        <tr>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {formatCurrency(charge.ammount)}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {charge.createdAt}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                <span
                    className={`py-1 px-4 rounded-xl ${chargeStatus[charge.status as keyof typeof chargeStatus].css}`}
                >
                    {
                        chargeStatus[charge.status as keyof typeof chargeStatus]
                            .text
                    }
                </span>
            </td>
        </tr>
    );
}
