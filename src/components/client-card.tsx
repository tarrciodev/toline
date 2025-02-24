import { EntityProps } from "@/store/entity";
import { FileCheck2, FolderKanban, Hourglass, Megaphone } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function ClientCard({ entity }: { entity: EntityProps }) {
    const publishedProjects = entity.projects?.length;

    const onGoingProjects = entity.projects?.filter(
        (project) => project.status != "Completado"
    ).length;

    const completedProjects = entity.projects?.filter(
        (project) => project.status == "Completado"
    ).length;
    return (
        <div className='flex gap-4 items-center'>
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

            <Card className='flex-1 rounded'>
                <CardContent className='flex items-center gap-2 pt-4'>
                    <span className='size-16 rounded-full flex items-center justify-center bg-teal-700 text-teal-50'>
                        <Hourglass />
                    </span>
                    <div>
                        <span className='font-semibold text-xl'>
                            {onGoingProjects}
                        </span>
                        <p>Em Andamento</p>
                    </div>
                </CardContent>
            </Card>

            <Card className='flex-1 rounded'>
                <CardContent className='flex items-center gap-2 pt-4'>
                    <span className='size-16 rounded-full flex items-center justify-center bg-green-600 text-green-50'>
                        <FileCheck2 />
                    </span>
                    <div>
                        <span className='font-semibold text-xl'>
                            {completedProjects}
                        </span>
                        <p>Concluidos</p>
                    </div>
                </CardContent>
            </Card>
            <Card className='flex-1 rounded'>
                <CardContent className='flex items-center gap-2 pt-4'>
                    <span className='size-16 rounded-full flex items-center justify-center bg-red-600 text-red-50'>
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
