import { getProjects } from "@/actions/projects/get-projects";
import { CategoryFilters } from "@/components/category/category-filters";
import { DashHeader } from "@/components/dash-header";
import { NotFoundFilter } from "@/components/not-fond-filter";
import { PaginationControll } from "@/components/pagination";
import { Project } from "@/components/project";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ slug: string; page: string }>;
}) {
    const { slug, page } = await searchParams;
    const { projects, totalItems } = await getProjects(slug, page);

    return (
        <div>
            <DashHeader />
            <div className='flex flex-col sm:flex-row px-4 sm:px-56 py-5 sm:py-10 gap-6'>
                <div className=' w-full sm:w-[20vw] bg-white px-3 sm:px-8 shadow-lg flex-col h-fit py-6'>
                    <h1 className='text-xl sm:text-4xl font-semibold mb-2'>
                        Filtros{" "}
                        <div className='flex sm:hidden'>
                            <PaginationControll totalResult={totalItems} />
                        </div>
                    </h1>
                    <CategoryFilters slug={slug} />
                </div>
                <div className='flex flex-col flex-1'>
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
                    <div className='mt-5 flex sm-hidden'>
                        <PaginationControll totalResult={totalItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}
