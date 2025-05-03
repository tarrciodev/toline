import { EntityProps } from "@/store/entity";
import { CircleDollarSign, FileCheck2, GavelIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export async function FreelancerCard({ entity }: { entity: EntityProps }) {
    const acceptedProposals = entity.projectsFreelanced?.filter(
        (project) => project.status != "Completado"
    ).length;
    const submittedProposals = entity.subscriptions?.filter(
        (subscription) => subscription.project.status != "Completado"
    ).length;

    return (
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center'>
            <Link href={`/dash/freelancer/${entity.id}/earnings`}>
                <Card className='flex  flex-1 items-center rounded'>
                    <CardContent className='flex items-center gap-2 pt-4'>
                        <span className='size-16 rounded-full flex items-center justify-center bg-blue-900 text-blue-50'>
                            <CircleDollarSign />
                        </span>
                        <div>
                            <span>0</span>
                            <p>Minhas Finanças</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href='/dash/freelancer/proposals?status=sent'>
                <Card className='flex-1 rounded'>
                    <CardContent className='flex items-center gap-2 pt-4'>
                        <span className='size-16 rounded-full flex items-center justify-center bg-teal-900 text-teal-50'>
                            <GavelIcon />
                        </span>
                        <div>
                            <span className='font-semibold text-xl'>
                                {submittedProposals}
                            </span>
                            <p>Propostas Enviadas</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href='/dash/freelancer/proposals?status=accepted'>
                <Card className='flex-1 rounded'>
                    <CardContent className='flex items-center gap-2 pt-4'>
                        <span className='size-16 rounded-full flex items-center justify-center bg-green-800 text-green-50'>
                            <FileCheck2 />
                        </span>
                        <div>
                            <span className='font-semibold text-xl'>
                                {acceptedProposals}
                            </span>
                            <p>Propostas Aceitas</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
            <Card className='flex-1 rounded'>
                <CardContent className='flex items-center gap-2 pt-4'>
                    <span className='size-16 rounded-full flex items-center justify-center bg-red-800 text-red-50'>
                        <FileCheck2 />
                    </span>
                    <div>
                        <span>0</span>
                        <p>Views no Perfil</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
