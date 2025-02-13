import { getProjects } from "@/actions/projects/get-projects";
import { CategoryFilters } from "@/components/category/category-filters";
import { DashHeader } from "@/components/dash-header";
import { NotFoundFilter } from "@/components/not-fond-filter";
import { Project } from "@/components/project";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ slug: string }>;
}) {
    const slug = ((await searchParams).slug as string) || "";
    const projects = await getProjects(slug);

    return (
        <div>
            <DashHeader />
            <div className='flex px-56 py-10 gap-6'>
                <div className='w-[20vw] bg-white py-3 px-8 shadow-lg'>
                    <h1 className='text-4xl font-semibold mb-2'>Filtros</h1>
                    <CategoryFilters slug={slug} />
                </div>
                <div className='flex flex-1'>
                    {projects.length === 0 ? (
                        <div className='flex flex-col  w-full justify-center items-center'>
                            <NotFoundFilter />
                            <strong>Nenhum projeto encontrado</strong>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4 w-full'>
                            {projects.map((project) => (
                                <Project key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
