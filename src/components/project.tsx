import { IProject } from "@/actions/projects/get-projects";
import Link from "next/link";

export function Project({ project }: { project: IProject }) {
    return (
        <div className='bg-white flex flex-col gap-2 border-t border-gray-200 w-full py-2 p-6'>
            <Link
                href={`/dash/project/${project.id}`}
                className='text-blue-700 font-semibold'
            >
                {project.name}
            </Link>
            <div className='flex gap-2'>
                <p>{project.category}</p>|
                <p>
                    Data de Publicaçao:{" "}
                    <span className='font-semibold'>{project?.createdAt}</span>
                </p>
                |
                <p>
                    <span>Subscritores:</span>{" "}
                    <span className='font-semibold'>
                        {project?.subscriptions?.length}
                    </span>
                </p>
            </div>
            <div>
                <p>{project?.description}</p>
            </div>
            <div>
                Proprietario do Projeto:{" "}
                <span className='font-semibold'>{project?.owner?.name}</span>
            </div>
        </div>
    );
}
