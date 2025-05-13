import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { getTolinerPayments } from "@/actions/toliners/get-toliner-payments";
import { Balance } from "../../(components)/balance";
import { FilterContainer } from "../../(components)/filter-container";
import { TransactionsContainer } from "./(components)/transaction-container";

export default async function ClienteFinanceiro() {
    const toliner = await getTolinerAsEntity();

    const payments = await getTolinerPayments(toliner.id);

    return (
        <div className='bg-white min-h-screen w-full'>
            <main className='sm:p-6'>
                <div className='mb-3'>
                    <h1 className='text-2xl font-bold text-gray-900 p-5 sm:p-0'>
                        Área Financeira
                    </h1>
                </div>

                <Balance ammount={toliner?.balance?.ammount} />

                <div className='bg-white rounded-lg shadow overflow-hidden'>
                    <div className='p-6'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>
                            Histórico de Pagamentos
                        </h2>

                        <FilterContainer />
                        <TransactionsContainer payments={payments} />
                    </div>
                </div>
            </main>
        </div>
    );
}
