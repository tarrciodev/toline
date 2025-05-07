"use client";
import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { useFilteredPayments } from "@/utils/filter-payments-per-period";
import { NoPayment } from "./no-payment";
import { TrPaymentItem } from "./tr-payment-item";

export default function PaymentsContainer({
    payments,
}: {
    payments: FreelancerPayments[];
}) {
    const filteredPayments = useFilteredPayments({ payments });
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Data
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Projeto
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Freelancer
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Valor
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {filteredPayments.map((payment) => (
                        <TrPaymentItem key={payment.id} payment={payment} />
                    ))}
                    {payments.length === 0 && <NoPayment />}
                </tbody>
            </table>
        </div>
    );
}
