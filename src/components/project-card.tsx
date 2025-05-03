"use client";
import { IProject } from "@/actions/projects/get-projects";
import { useProjectStatusConfig } from "@/hooks/project-status-config";
import { Briefcase, Calendar, FileText } from "lucide-react";

export function ProjectCard({
    project,
    entityType,
}: {
    project: IProject;
    entityType: "client" | "freelancer";
}) {
    const { currentStatus, StatusIcon } = useProjectStatusConfig(entityType);

    return (
        <div className='bg-white rounded-lg shadow p-6 pb-0 transition-all hover:shadow-md '>
            <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-semibold text-blue-600'>
                    {project.name}
                </h3>
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${currentStatus?.badgeClass}`}
                >
                    {StatusIcon && <StatusIcon size={14} className='mr-1' />}
                    {currentStatus?.text}
                </span>
            </div>

            <div className='flex flex-wrap gap-4 mb-4 text-gray-500 text-sm'>
                <div className='flex items-center'>
                    <Briefcase size={16} className='mr-2' />
                    <span>{project.category}</span>
                </div>
                <div className='flex items-center'>
                    <Calendar size={16} className='mr-2' />
                    <span>
                        Data:{" "}
                        <span className='text-blue-600 font-medium'>
                            {project.createdAt}
                        </span>
                    </span>
                </div>
                <div className='flex items-center'>
                    <FileText size={16} className='mr-2' />
                    <span>
                        Propostas:{" "}
                        <span className='text-blue-600 font-medium'>
                            {project.subscriptions?.length}
                        </span>
                    </span>
                </div>
            </div>

            <div
                className='mb-4 text-gray-700'
                // dangerouslySetInnerHTML={{ __html: project.description }}
            />

            <h4 className='font-medium mb-2'>Habilidades</h4>
            <div className='flex flex-wrap gap-2 mb-4'>
                {project?.skills?.map((skill) => (
                    <span
                        key={skill.id}
                        className='bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium'
                    >
                        {skill.name}
                    </span>
                ))}
            </div>

            <div className='flex items-center py-1 mt-4 border-t border-gray-200 gap-2'>
                <p className='font-semibold'>Cliente:</p>
                <span className='font-medium'>{project.owner?.name}</span>
            </div>
        </div>
    );
}
