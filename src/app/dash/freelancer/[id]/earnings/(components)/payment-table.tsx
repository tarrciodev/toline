import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import TrPayment from "./tr-payment";

export function PaymenTable({ payments }: { payments: FreelancerPayments[] }) {
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Projeto
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Cliente
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Valor
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Data
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {(payments ?? []).length > 0 &&
                        payments.map((payment) => (
                            <TrPayment key={payment.id} payment={payment} />
                        ))}
                </tbody>
            </table>
        </div>
    );
}
