// pages/earnings.js
"use client";
import { useState } from "react";

// Mock data for earnings display
const mockEarningsData = [
    {
        id: 1,
        projectName: "Website Redesign",
        client: "Tech Solutions Inc.",
        amount: 1200,
        date: "2025-04-15",
        status: "Paid",
    },
    {
        id: 2,
        projectName: "Mobile App Development",
        client: "StartUp Ventures",
        amount: 3500,
        date: "2025-04-10",
        status: "Paid",
    },
    {
        id: 3,
        projectName: "E-commerce Integration",
        client: "Fashion Outlet",
        amount: 850,
        date: "2025-04-05",
        status: "Processing",
    },
    {
        id: 4,
        projectName: "SEO Optimization",
        client: "Local Business",
        amount: 600,
        date: "2025-03-28",
        status: "Paid",
    },
    {
        id: 5,
        projectName: "Logo Design",
        client: "Creative Studios",
        amount: 350,
        date: "2025-03-20",
        status: "Paid",
    },
];

// Monthly statistics
const monthlyStats = [
    { month: "Janeiro", earnings: 4200 },
    { month: "Fevereiro", earnings: 3800 },
    { month: "Março", earnings: 5100 },
    { month: "Abril", earnings: 6150 },
];

export default function EarningsPage() {
    const [activeTab, setActiveTab] = useState("transactions");

    // Calculate total earnings
    const totalEarnings = mockEarningsData.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    // Calculate pending payments
    const pendingPayments = mockEarningsData
        .filter((item) => item.status === "Processing")
        .reduce((sum, item) => sum + item.amount, 0);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(amount);
    };

    return (
        <div className='min-h-screen '>
            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center'>
                            <div className='bg-blue-600 p-3 rounded-full'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-white'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                            </div>
                            <div className='ml-4'>
                                <p className='text-lg font-bold'>
                                    {formatCurrency(totalEarnings)}
                                </p>
                                <p className='text-gray-600'>Ganhos Totais</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center'>
                            <div className='bg-green-600 p-3 rounded-full'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-white'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                            </div>
                            <div className='ml-4'>
                                <p className='text-lg font-bold'>
                                    {
                                        mockEarningsData.filter(
                                            (item) => item.status === "Paid"
                                        ).length
                                    }
                                </p>
                                <p className='text-gray-600'>
                                    Pagamentos Recebidos
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center'>
                            <div className='bg-yellow-500 p-3 rounded-full'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-white'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                            </div>
                            <div className='ml-4'>
                                <p className='text-lg font-bold'>
                                    {formatCurrency(pendingPayments)}
                                </p>
                                <p className='text-gray-600'>
                                    Pagamentos Pendentes
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center'>
                            <div className='bg-red-600 p-3 rounded-full'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6 text-white'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                    />
                                </svg>
                            </div>
                            <div className='ml-4'>
                                <p className='text-lg font-bold'>
                                    {formatCurrency(monthlyStats[3].earnings)}
                                </p>
                                <p className='text-gray-600'>Ganhos Este Mês</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
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
                                        {mockEarningsData.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                                    {transaction.projectName}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {transaction.client}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {new Date(
                                                        transaction.date
                                                    ).toLocaleDateString(
                                                        "pt-BR"
                                                    )}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span
                                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${transaction.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                                                    >
                                                        {transaction.status ===
                                                        "Paid"
                                                            ? "Pago"
                                                            : "Processando"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>
                                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                                    Ganhos por Mês (2025)
                                </h3>

                                {/* Monthly statistics */}
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
                                                    {formatCurrency(
                                                        month.earnings
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Chart visualization */}
                                <div className='mt-8'>
                                    <div className='h-64'>
                                        <div className='flex h-full items-end justify-between'>
                                            {monthlyStats.map(
                                                (month, index) => {
                                                    // Calculate height percentage based on max earnings
                                                    const maxEarnings =
                                                        Math.max(
                                                            ...monthlyStats.map(
                                                                (m) =>
                                                                    m.earnings
                                                            )
                                                        );
                                                    const heightPercentage =
                                                        (month.earnings /
                                                            maxEarnings) *
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
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
