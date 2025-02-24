import { getUserAsEntity } from "@/actions/users/get-entity";
import { Can } from "@/components/can";
import { DashHeader } from "@/components/dash-header";
import { AboutMe } from "@/components/profile/about-me";
import { FreelancerCard } from "@/components/profile/freelancer-card";
import { ProfileSideBar } from "@/components/profile/profile-sidebar";
import { ProjectsIHaveWorkedOn } from "@/components/profile/projects-i-have-worked-on";
import UserIdentification from "@/components/profile/user-identification";
import { UserProfileSkills } from "@/components/profile/user-profile-skills";

export default async function EditProfile() {
    const entity = await getUserAsEntity();
    const defaultScore = 70;
    const bioScore = entity?.bio ? 10 : 0;
    const identificationScore = entity?.identification ? 20 : 0;

    const profileCompletation = defaultScore + bioScore + identificationScore;

    return (
        <div className='h-[100dvh]'>
            <DashHeader />
            <div className='px-56 flex py-3 gap-6'>
                <div className='flex flex-col flex-1 gap-2'>
                    <FreelancerCard entity={entity} />
                    <AboutMe userId={entity.id} />
                    <Can who='freelancer'>
                        <>
                            <UserProfileSkills
                                freelancerId={entity.userId}
                                userSkills={entity.skills!}
                            />
                            {/* <Certification
                                certifications={entity?.certifications}
                            /> */}
                            <ProjectsIHaveWorkedOn
                                entityId={entity.userId}
                                showCases={entity.showCases!}
                            />
                            {!entity.identification && (
                                <UserIdentification userId={entity.id} />
                            )}
                        </>
                    </Can>
                </div>
                <aside className='w-[20dvw]'>
                    <ProfileSideBar
                        entityType={entity.type}
                        projects={entity?.projects}
                        certifications={entity?.certifications?.length ?? 0}
                        skills={entity?.skills?.length ?? 0}
                        createdAt={entity?.createdAt}
                        profileCompletation={profileCompletation}
                    />
                </aside>
            </div>
        </div>
    );
}
