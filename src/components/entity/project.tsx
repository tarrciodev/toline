import Link from "next/link";
import { Badge } from "../ui/badge";

interface IEntityProject {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    category: string;
    subcategory?: string;
    skills?: {
        id: string;
        name: string;
    }[];
    subscriptions?: Array<{
        id: string;
        freelancer: {
            id: string;
            name: string;
        };
    }>;
    owner?: {
        name: string;
        id: string;
    };
}

export function Project({
    project,
    entityType,
}: {
    project: IEntityProject;
    entityType: string;
}) {
    return (
        <div className='bg-white flex flex-col gap-2 border-t border-gray-200 w-full py-2 p-6 shadow-lg'>
            <Link
                className='text-blue-700 font-semibold'
                href={`/dash/client/project/${project.id}`}
            >
                <strong>{project.name}</strong>
            </Link>
            <div className='text-sm flex gap-2'>
                <p>
                    Categoria:{" "}
                    <span className='font-semibold'>{project.category}</span>
                </p>
                {project.subcategory && (
                    <p>
                        Subcategoria:{" "}
                        <span className='font-semibold'>
                            {project.subcategory}
                        </span>
                    </p>
                )}
                <p>
                    Publicado:{" "}
                    <span className='font-semibold'>{project.createdAt}</span>
                </p>
            </div>
            <div>
                <p>
                    <span className='font-semibold'>Descrição:</span>{" "}
                    {project.description}
                </p>
            </div>
            <div>
                <p>Skills</p>
                <div className='flex gap-2'>
                    {project.skills?.map((skill) => (
                        <Badge key={skill.id}>{skill.name}</Badge>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 justify-between mt-2'>
                {entityType === "freelancer" && (
                    <p>
                        Proprietário do Projeto:{" "}
                        <span>{project?.owner?.name}</span>
                    </p>
                )}
                <div>
                    Subscritores:{" "}
                    <span className='font-semibold'>
                        {project?.subscriptions?.length}
                    </span>
                </div>
            </div>
        </div>
    );
}
