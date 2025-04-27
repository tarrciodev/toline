import { IProject } from "@/actions/projects/get-projects";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function Project({ project }: { project: IProject }) {
    return (
        <div className='bg-white flex flex-col gap-2 border-t border-gray-200 w-full py-2 px-2 sm:p-6'>
            <Link
                href={`/dash/project/${project.id}`}
                className='text-blue-700 font-semibold'
            >
                {project.name}
            </Link>
            <div className='flex gap-2 flex-wrap items-center'>
                <p className='text-sm sm:text-base'>{project.category}</p>
                {project.subcategory && (
                    <>
                        |<p>{project.subcategory}</p>
                    </>
                )}
                <p className='text-sm sm:text-base'>
                    Data de Publicaçao:{" "}
                    <span className='font-semibold'>{project?.createdAt}</span>
                </p>
                |
                <p className='text-sm sm:text-base'>
                    <span>Subscritores:</span>{" "}
                    <span className='font-semibold'>
                        {project?.subscriptions?.length}
                    </span>
                </p>
            </div>
            <div>
                <p
                    className='line-clamp-5 prose max-w-none'
                    dangerouslySetInnerHTML={{ __html: project.description! }}
                />
            </div>
            {project.skills?.length != 0 && (
                <div>
                    <p className='font-semibold'>Skills</p>
                    {project.skills?.map((skill) => (
                        <Badge key={skill.id}>{skill.name}</Badge>
                    ))}
                </div>
            )}
            <div>
                Proprietario:{" "}
                <span className='font-semibold'>{project?.owner?.name}</span>
            </div>
        </div>
    );
}
