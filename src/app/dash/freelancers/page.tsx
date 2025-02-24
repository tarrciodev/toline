import { getFreelancers } from "@/actions/freelancer/get-freelancers";
import { DashHeader } from "@/components/dash-header";
import { Freelancer } from "@/components/freelancer";
import { FreelancersFilters } from "@/components/freelancers/freelancers-filter";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ especialization: string; skills: string }>;
}) {
    const skills = (await searchParams).skills;
    const especialization = (await searchParams).especialization;
    const freelancers = await getFreelancers(especialization, skills);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <DashHeader />
            <div className='px-4 sm:px-56 flex py-3 w-full gap-6'>
                <div className='w-[20vw] bg-white py-3 px-8 shadow-lg hidden sm:block'>
                    <h1 className='text-4xl font-semibold mb-2'>Filtros</h1>
                    <FreelancersFilters />
                </div>
                <div className='flex flex-col flex-1 gap-2'>
                    {freelancers.map((freelancer) => (
                        <Freelancer
                            freelancer={freelancer}
                            key={freelancer.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
