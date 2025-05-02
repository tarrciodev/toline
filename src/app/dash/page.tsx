import { getBanner } from "@/actions/banner";
import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { Can } from "@/components/can";
import { ClientCard } from "@/components/client-card";
import { ProjectsOfinterest } from "@/components/dash/projects-of-interest";
import { FreelancerCard } from "@/components/freelancer-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserProfileCard } from "@/components/user-profile-card";
import { getCookieStore, setCookieStore } from "@/utils/cookie-store";
import Link from "next/link";
import { WorkshopBanner } from "./(components)/banner";

export default async function DashBoard() {
    const entity = await getTolinerAsEntity();

    const logged_as = await getCookieStore("logged_as");
    if (!logged_as) {
        await setCookieStore("logged_as", entity.type);
    }
    const userIsLoggedAs = logged_as ?? entity.type;
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
                <UserProfileCard />
                <Card className='flex-1 rounded px-4'>
                    <CardHeader>
                        {userIsLoggedAs === "client" ? (
                            <Link
                                href={`/dash/client/projects`}
                                className='text-lg font-semibold cursor-pointer'
                            >
                                <p className='bg-zinc-300 rounded-xl w-fit px-3 py-1'>
                                    Meus Projetos{" "}
                                </p>
                            </Link>
                        ) : (
                            <p>Projetos de Interesse</p>
                        )}
                    </CardHeader>
                    {userIsLoggedAs == "freelancer" ? (
                        <>
                            <ProjectsOfinterest userEmail={entity.email} />
                            <div className='flex justify-end py-4'>
                                <Link
                                    href='/dash/projects'
                                    className='p-2 bg-zinc-300 rounded-xl hover:bg-zinc-200 cursor-pointer'
                                >
                                    ver todos os projetos
                                </Link>
                            </div>
                        </>
                    ) : (
                        <CardContent className='flex justify-center gap-2 items-center'>
                            <p className='text-xl'>
                                {entity.projects?.length != 0
                                    ? `${entity.projects?.length}`
                                    : "sem"}{" "}
                                projetos publicados
                            </p>
                            <Link
                                href='/dash/project/new'
                                prefetch
                                className='px-4 rounded-lg py-2 bg-blue-600 text-blue-50'
                            >
                                Publicar Projeto
                            </Link>
                        </CardContent>
                    )}
                </Card>
            </div>
        </main>
    );
}
