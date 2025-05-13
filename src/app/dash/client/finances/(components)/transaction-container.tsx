"use client";
import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { EmptyPayment } from "@/app/dash/freelancer/[id]/earnings/(components)/empty-payment";
import { RechargesTable } from "@/app/dash/freelancer/[id]/earnings/(components)/recharge-table";
import { useFilteredPayments } from "@/utils/filter-payments-per-period";
import { useState } from "react";
import PaymentsContainer from "./payments-container";

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
        <div className='bg-white rounded-lg'>
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
                            <PaymentsContainer payments={filterdPayments} />
                        )}
                    </>
                ) : (
                    <RechargesTable />
                )}
            </div>
        </div>
    );
}
