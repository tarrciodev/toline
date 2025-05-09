import { getFreelancerById } from "@/actions/freelancer/get-freelancer-by-id";
import { ProfileSideBar } from "@/components/profile/profile-sidebar";
import { UserCard } from "@/components/profile/user-card";
import { UserProfileSkills } from "@/components/profile/user-profile-skills";

export default async function Freelancer({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const freelancer = await getFreelancerById(id);
    const entity = {
        name: freelancer?.name as string,
        avatarUrl: freelancer?.avatarUrl as string,
        jobDescription: freelancer?.jobDescription as string,
        bio: freelancer?.bio as string,
    };

    return (
        <div className='flex gap-4 w-full'>
            <div className='flex flex-col flex-1 gap-2 w-full'>
                <UserCard entity={entity} />
                <UserProfileSkills
                    freelancerId={freelancer!.id}
                    userSkills={freelancer!.skills!}
                    publicProfile
                />
            </div>
            <aside className='w-[300dvw] hidden sm:flex'>
                <ProfileSideBar
                    projects={freelancer?.projects}
                    skills={freelancer?.skills?.length ?? 0}
                    createdAt={freelancer?.createdAt as string}
                    profileCompletation={90}
                    entityType='freelancer'
                />
            </aside>
        </div>
    );
}
