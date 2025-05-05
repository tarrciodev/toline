import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Balance } from "./(components)/balance";
import { FilterContainer } from "./(components)/filter-container";
import { NoPayment } from "./(components)/no-payment";
import { RechargeButton } from "./(components)/recharge-button";
import { RechargeForm } from "./(components)/recharge-form";
import { TrPaymentItem } from "./(components)/tr-payment-item";

export default async function ClienteFinanceiro() {
    const toliner = await getTolinerAsEntity();

    const payments = toliner?.Payments ?? [];
    return (
        <div className='bg-white min-h-screen w-full'>
            <main className='p-6'>
                <div className='mb-3'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Área Financeira
                    </h1>
                </div>

                <div className='bg-white rounded-lg shadow p-6 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                    <div>
                        <p className='text-gray-500 text-sm'>Seu saldo atual</p>
                        <Balance ammount={toliner?.balance?.ammount} />
                    </div>
                    <RechargeButton>
                        <RechargeForm />
                    </RechargeButton>
                </div>

                <div className='bg-white rounded-lg shadow overflow-hidden'>
                    <div className='p-6'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>
                            Histórico de Pagamentos
                        </h2>

                        {/* Barra de Filtros */}
                        <div className='flex flex-col md:flex-row justify-between mb-6 gap-4'>
                            <div className='flex items-center bg-gray-100 rounded-md px-3 py-2 w-full md:w-80'>
                                <svg
                                    className='h-5 w-5 text-gray-400'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                                <input
                                    type='text'
                                    placeholder='Buscar pagamentos...'
                                    className='ml-2 bg-transparent outline-none w-full'
                                />
                            </div>
                            <FilterContainer />
                        </div>

                        {/* Tabela de Pagamentos */}
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
                                    {payments.map((payment) => (
                                        <TrPaymentItem
                                            key={payment.id}
                                            payment={payment}
                                        />
                                    ))}
                                    {payments.length === 0 && <NoPayment />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
