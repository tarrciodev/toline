import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Can } from "@/components/can";
import { AboutMe } from "@/components/profile/about-me";
import { ProfileSideBar } from "@/components/profile/profile-sidebar";
import { ProjectsIHaveWorkedOn } from "@/components/profile/projects-i-have-worked-on";
import { UserCard } from "@/components/profile/user-card";
import UserIdentification from "@/components/profile/user-identification";
import { UserProfileSkills } from "@/components/profile/user-profile-skills";
import { UserSpecializations } from "@/components/profile/user-specialization";
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
    const user = {
        bio: bio as string,
        name: entity.name as string,
        avatarUrl: entity.avatarUrl as string,
        jobDescription: entity.jobDescription,
    };

    return (
        <main className='flex flex-col sm:flex-row py-3 gap-6 w-full'>
            <div className='flex flex-col flex-1 gap-2'>
                <UserCard entity={user} />
                <AboutMe userId={entity.userId} bio={bio as string} />
                <Can who='freelancer'>
                    <>
                        <UserSpecializations
                            tolinerId={entity.id}
                            userSpecializations={entity.specialization!}
                        />
                        <UserProfileSkills
                            freelancerId={entity.userId}
                            userSkills={entity.skills!}
                        />
                        <ProjectsIHaveWorkedOn
                            entityId={entity.id}
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
