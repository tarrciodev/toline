import { EntityProps } from "@/store/entity";
import { FileCheck2, FolderKanban, Hourglass, Megaphone } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export function ClientCard({ entity }: { entity: EntityProps }) {
    const publishedProjects = entity.projects?.length;

    const onGoingProjects = entity.projects?.filter(
        (project) => project.status != "Em andamento"
    ).length;

    const completedProjects = entity.projects?.filter(
        (project) => project.status == "Concluido"
    ).length;
    return (
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center'>
            <Link href={`/dash/client/projects?query=published`}>
                <Card className='flex  flex-1 items-center rounded'>
                    <CardContent className='flex items-center gap-2 pt-4'>
                        <span className='size-16 rounded-full flex items-center justify-center bg-blue-700 text-blue-50'>
                            <FolderKanban />
                        </span>
                        <div>
                            <span className='font-semibold text-xl'>
                                {publishedProjects}
                            </span>
                            <p>Projetos publicados</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href={`/dash/client/projects?query=ongoing`}>
                <Card className='flex-1 rounded'>
                    <CardContent className='flex items-center gap-2 pt-4'>
                        <span className='size-16 rounded-full flex items-center justify-center bg-green-800 text-green-50'>
                            <Hourglass />
                        </span>
                        <div>
                            <span className='font-semibold text-xl'>
                                {onGoingProjects}
                            </span>
                            <p>Projetos em andamento</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link href={`/dash/client/projects?query=completed`}>
                <Card className='flex-1 rounded'>
                    <CardContent className='flex items-center gap-2 pt-4'>
                        <span className='size-16 rounded-full flex items-center justify-center bg-purple-800 text-purple-50'>
                            <FileCheck2 />
                        </span>
                        <div>
                            <span className='font-semibold text-xl'>
                                {completedProjects}
                            </span>
                            <p>Projetos concluídos</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
            <Card className='flex-1 rounded'>
                <CardContent className='flex items-center gap-2 pt-4'>
                    <span className='size-16 rounded-full flex items-center justify-center bg-red-800 text-red-50'>
                        <Megaphone />
                    </span>
                    <div>
                        <span>0</span>
                        <p>Anuncios</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
