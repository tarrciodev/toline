import { getBanner } from "@/actions/banner";
import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Can } from "@/components/can";
import { ClientCard } from "@/components/client-card";
import { ProjectsOfinterest } from "@/components/dash/projects-of-interest";
import { FreelancerCard } from "@/components/freelancer-card";
// import { UserProfileCard } from "@/components/user-profile-card";
import { WorkshopBanner } from "./(components)/banner";
import { DashContent } from "./(components)/dash-content";

export default async function DashBoard() {
    const entity = await getTolinerAsEntity();

    const banner = await getBanner();

    return (
        <main className='w-full'>
            {banner && <WorkshopBanner banner={banner} />}
            <Can who='freelancer'>
                <FreelancerCard entity={entity!} />
            </Can>
            <Can who='client'>
                <ClientCard entity={entity!} />
            </Can>
            <div className='flex flex-col-reverse sm:flex-row gap-2 mt-8'>
                {/* <UserProfileCard /> */}
                <div className='flex-1 w-full'>
                    <DashContent toliner={entity!}>
                        <ProjectsOfinterest userEmail={entity.email} />
                    </DashContent>
                </div>
            </div>
        </main>
    );
}
