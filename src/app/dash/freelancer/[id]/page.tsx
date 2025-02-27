import { getFreelancerById } from "@/actions/freelancer/get-freelancer-by-id";
import { Certification } from "@/components/profile/certification";
import { FreelancerCard } from "@/components/profile/freelancer-card";
import { ProfileSideBar } from "@/components/profile/profile-sidebar";
import { UserProfileSkills } from "@/components/profile/user-profile-skills";

export default async function Freelancer({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const freelancer = await getFreelancerById(id);

    return (
        <div className='flex gap-4'>
            <div className='flex flex-col flex-1 gap-2'>
                <FreelancerCard entity={freelancer!} />
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
            <aside className='w-[300dvw]'>
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
