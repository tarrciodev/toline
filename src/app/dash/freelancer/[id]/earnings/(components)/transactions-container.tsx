"use client";
import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { useFilteredPayments } from "@/utils/filter-payments-per-period";
import { useState } from "react";
import { EmptyPayment } from "./empty-payment";
import { PaymenTable } from "./payment-table";
import { RechargesTable } from "./recharge-table";

export function TransactionsContainer({
    payments,
}: {
    payments: FreelancerPayments[];
}) {
    const [activeTab, setActiveTab] = useState("payments");

    const filterdPayments = useFilteredPayments({
        payments,
    });

    return (
        <div className='bg-white rounded-lg shadow'>
            <div className='border-b border-gray-200'>
                <nav className='flex'>
                    <button
                        onClick={() => setActiveTab("payments")}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === "transactions" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Pagamentos
                    </button>
                    <button
                        onClick={() => setActiveTab("recharges")}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === "monthly" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Recargas
                    </button>
                </nav>
            </div>

            <div className='p-6'>
                {activeTab === "payments" ? (
                    <>
                        {(payments ?? []).length === 0 ? (
                            <EmptyPayment />
                        ) : (
                            <PaymenTable payments={filterdPayments} />
                        )}
                    </>
                ) : (
                    <RechargesTable />
                )}
            </div>
        </div>
    );
}
