"use client";
import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { useFilteredPayments } from "@/utils/filter-payments-per-period";
import { formatCurrency } from "@/utils/format-currency";
import { useState } from "react";
import { PaymenTable } from "./payment-table";

export function TransactionsContainer({
    payments,
}: {
    payments: FreelancerPayments[];
}) {
    const [activeTab, setActiveTab] = useState("transactions");
    const monthlyStats = [
        { month: "Janeiro", earnings: 4200 },
        { month: "Fevereiro", earnings: 3800 },
        { month: "Março", earnings: 5100 },
        { month: "Abril", earnings: 6150 },
    ];

    const filterdPayments = useFilteredPayments({
        payments,
    });

    console.log({ filterdPayments });
    return (
        <div className='bg-white rounded-lg shadow'>
            <div className='border-b border-gray-200'>
                <nav className='flex'>
                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === "transactions" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Transações
                    </button>
                    <button
                        onClick={() => setActiveTab("monthly")}
                        className={`px-6 py-4 text-sm font-medium ${activeTab === "monthly" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Relatório Mensal
                    </button>
                </nav>
            </div>

            <div className='p-6'>
                {activeTab === "transactions" ? (
                    <PaymenTable payments={filterdPayments} />
                ) : (
                    <div>
                        <h3 className='text-lg font-medium text-gray-900 mb-4'>
                            Ganhos por Mês (2025)
                        </h3>

                        <div className='mb-6'>
                            <div className='grid grid-cols-4 gap-4'>
                                {monthlyStats.map((month, index) => (
                                    <div
                                        key={index}
                                        className='bg-gray-50 p-4 rounded-lg'
                                    >
                                        <p className='text-sm font-medium text-gray-500'>
                                            {month.month}
                                        </p>
                                        <p className='text-lg font-bold text-gray-900 mt-1'>
                                            {formatCurrency(month.earnings)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className='h-64'>
                                <div className='flex h-full items-end justify-between'>
                                    {monthlyStats.map((month, index) => {
                                        const maxEarnings = Math.max(
                                            ...monthlyStats.map(
                                                (m) => m.earnings
                                            )
                                        );
                                        const heightPercentage =
                                            (month.earnings / maxEarnings) *
                                            100;

                                        return (
                                            <div
                                                key={index}
                                                className='w-full flex flex-col items-center'
                                            >
                                                <div
                                                    className='w-16 bg-blue-500 rounded-t'
                                                    style={{
                                                        height: `${heightPercentage}%`,
                                                    }}
                                                ></div>
                                                <p className='mt-2 text-xs text-gray-500'>
                                                    {month.month.substring(
                                                        0,
                                                        3
                                                    )}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
