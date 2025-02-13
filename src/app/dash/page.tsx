import { getUserAsEntity } from "@/actions/users/get-entity";
import { Can } from "@/components/can";
import { ClientCards } from "@/components/client-cards";
import { DashHeader } from "@/components/dash-header";
import { FreelancerCards } from "@/components/freelancer-cards";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserProfileCard } from "@/components/user-profile-card";
import Link from "next/link";

export default async function DashBoard() {
    const response = await getUserAsEntity();
    const entity = response.data;
    return (
        <div className='bg-gray-200 h-screen'>
            <DashHeader />
            <main className='px-56 py-6'>
                <Can who='freelancer'>
                    <FreelancerCards entity={entity!} />
                </Can>
                <Can who='client'>
                    <ClientCards entity={entity!} />
                </Can>
                <div className='flex gap-2 mt-8'>
                    <UserProfileCard />
                    <Card className='flex-1 rounded'>
                        <CardHeader>
                            <Link href={`/dash/client/projects`}>
                                Meus Projetos
                            </Link>
                        </CardHeader>
                        <CardContent className='flex justify-center gap-2 items-center'>
                            <p className='text-xl'>Sem projetos publicados</p>
                            <Link
                                href='/dash/project/new'
                                prefetch
                                className='px-4 rounded-lg py-2 bg-blue-600 text-blue-50'
                            >
                                Publicar Projeto
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
