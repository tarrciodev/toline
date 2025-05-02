import { getFreelancerById } from "@/actions/freelancer/get-freelancer-by-id";
import { Certification } from "@/components/profile/certification";
import { FreelancerCard } from "@/components/profile/freelancer-card";
import { ProfileSideBar } from "@/components/profile/profile-sidebar";
import { UserProfileSkills } from "@/components/profile/user-profile-skills";
import { getCookieStore } from "@/utils/cookie-store";

export default async function Freelancer({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const freelancer = await getFreelancerById(id);
    const logged_as = (await getCookieStore("logged_as")) as
        | "client"
        | "freelancer";

    return (
        <div className='flex gap-4 w-full'>
            <div className='flex flex-col flex-1 gap-2 w-full'>
                <FreelancerCard entity={freelancer!} logged_as={logged_as} />
                <UserProfileSkills
                    freelancerId={freelancer!.id}
                    userSkills={freelancer!.skills!}
                    publicProfile
                />
                <Certification
                    certifications={freelancer!.certifications}
                    publicProfile
                />
            </div>
            <aside className='w-[300dvw] hidden sm:flex'>
                <ProfileSideBar
                    projects={freelancer?.projects}
                    certifications={freelancer?.certifications?.length ?? 0}
                    skills={freelancer?.skills?.length ?? 0}
                    createdAt={freelancer?.createdAt as string}
                    profileCompletation={90}
                    entityType='freelancer'
                />
            </aside>
        </div>
    );
}
