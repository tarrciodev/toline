import { getProjects } from "@/actions/projects/get-projects";
import { CategoryFilters } from "@/components/category/category-filters";
import { PaginationControll } from "@/components/pagination";
import { Project } from "@/components/project";
import { NoProjectFound } from "../freelancer/proposals/(components)/no-project";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ slug: string; page: string }>;
}) {
    const { slug, page } = await searchParams;
    const { projects, totalItems } = await getProjects(slug, page);

    return (
        <main className='flex flex-col sm:flex-row  sm:py-3 gap-2 sm:gap-6 w-full min-h-screen'>
            <div className=' w-full sm:w-[20vw] bg-white px-3 sm:px-8 shadow-lg flex-col h-fit py-6 sticky top-12 sm:top-20 self-start'>
                <h1 className='text-xl sm:text-4xl font-semibold mb-2'>
                    Filtros{" "}
                    {totalItems / 8 > 1 && (
                        <div className='flex w-full sm:hidden'>
                            <PaginationControll totalResult={totalItems} />
                        </div>
                    )}
                </h1>
                <CategoryFilters slug={slug} />
            </div>
            <div className='flex flex-col flex-1'>
                {(projects ?? []).length === 0 ? (
                    <NoProjectFound />
                ) : (
                    <div className='flex flex-col gap-4 w-full'>
                        {projects.map((project) => (
                            <Project key={project.id} project={project} />
                        ))}
                    </div>
                )}
                {totalItems / 8 > 1 && (
                    <div className='mt-5 flex sm-hidden justify-end'>
                        <div className='w-[20vw]'>
                            <PaginationControll totalResult={totalItems} />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
