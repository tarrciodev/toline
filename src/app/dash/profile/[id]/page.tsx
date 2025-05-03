import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Can } from "@/components/can";
import { AboutMe } from "@/components/profile/about-me";
import { FreelancerCard } from "@/components/profile/freelancer-card";
import { ProfileSideBar } from "@/components/profile/profile-sidebar";
import { ProjectsIHaveWorkedOn } from "@/components/profile/projects-i-have-worked-on";
import UserIdentification from "@/components/profile/user-identification";
import { UserProfileSkills } from "@/components/profile/user-profile-skills";
import { getCookieStore } from "@/utils/cookie-store";
import { AlterPasswordModal } from "./(components)/alter-password-modal";
import { DeleteAccountModal } from "./(components)/delete-account-modal";

export default async function EditProfile() {
    const entity = await getTolinerAsEntity();
    const defaultScore = 70;
    const identificationScore = entity?.identification ? 20 : 0;

    const logged_as = (await getCookieStore("logged_as")) as
        | "client"
        | "freelancer";

    const bio =
        logged_as == "freelancer" ? entity.freelancerBio : entity.clientBio;
    const bioScore = bio ? 10 : 0;
    const profileCompletation = defaultScore + bioScore + identificationScore;

    return (
        <main className='flex flex-col sm:flex-row py-3 gap-6 w-full'>
            <div className='flex flex-col flex-1 gap-2'>
                <FreelancerCard entity={entity} logged_as={logged_as} />
                <AboutMe userId={entity.userId} bio={bio as string} />
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
            <aside className='hidden sm:flex flex-col w-[20dvw] sticky top-20 self-start'>
                <ProfileSideBar
                    entityType={entity.type}
                    projects={entity?.projects}
                    certifications={entity?.certifications?.length ?? 0}
                    skills={entity?.skills?.length ?? 0}
                    createdAt={entity?.createdAt}
                    profileCompletation={profileCompletation}
                />
                <div className='my-2 bg-white rounded-lg p-4 flex flex-col gap-2'>
                    <AlterPasswordModal />
                    <DeleteAccountModal />
                </div>
            </aside>
        </main>
    );
}
