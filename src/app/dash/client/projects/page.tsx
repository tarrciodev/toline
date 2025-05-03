import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { ProjectFilters } from "./(components)/filters";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ query: string; page: string }>;
}) {
    const entity = await getTolinerAsEntity();
    const projects = entity?.projects;
    const query = (await searchParams).query;

    const filter = {
        ongoing: "Em Andamento",
        completed: "Concluido",
    };

    const filteredProjects =
        query == "published"
            ? projects
            : (projects?.filter(
                  (project) =>
                      project.status === filter[query as keyof typeof filter]
              ) ?? []);

    return (
        <main className='flex gap-4 w-full'>
            <ProjectFilters />
            <div className='flex flex-col flex-1 gap-1'>
                {filteredProjects?.map((project) => (
                    <Link
                        key={project.id}
                        href={`/dash/client/project/${project.id}`}
                    >
                        <ProjectCard project={project} entityType='client' />
                    </Link>
                ))}
            </div>
        </main>
    );
}
