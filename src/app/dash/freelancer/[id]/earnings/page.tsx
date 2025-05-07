import { getFreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Balance } from "@/app/dash/(components)/balance";
import { FilterContainer } from "@/app/dash/(components)/filter-container";
import { TransactionsContainer } from "./(components)/transactions-container";

export default async function EarningsPage() {
    const toliner = await getTolinerAsEntity();
    const payments = await getFreelancerPayments(toliner.id);

    return (
        <div className='min-h-screen w-full'>
            <div className='container px-4 py-8 bg-white'>
                <Balance ammount={toliner?.balance?.ammount} />
                <FilterContainer />

                <TransactionsContainer payments={payments} />
            </div>
        </div>
    );
}
