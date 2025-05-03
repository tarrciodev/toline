import { getProjectById } from "@/actions/projects/get-project-by-id";
import { getMe } from "@/actions/users/get-me";
import { ProjectSideBar } from "@/components/project-details";
import { Badge } from "@/components/ui/badge";
import { getCookieStore } from "@/utils/cookie-store";

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const project = await getProjectById(id);

    const user = await getMe();
    const entity = {
        id: user.tolinerId,
        type: user.type as "freelancer" | "client",
    };

    const logged_as = (await getCookieStore("logged_as")) as
        | "client"
        | "freelancer";

    return (
        <main className='flex flex-col sm:flex-row sm:justify-between  w-full gap-6 p-4 min-h-screen'>
            <div className='flex flex-col flex-1 bg-gray-50 px-10 py-6 shadow'>
                <div className='space-y-4'>
                    <h1 className='text-4xl font-bold '>{project?.name}</h1>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: project?.description,
                        }}
                    />
                    <div className='flex gap-2'>
                        <p>Status: {project?.status}</p>
                        <p>Data de Publicaçao: {project?.createdAt}</p>
                    </div>
                </div>
                <div className='mt-5'>
                    <h2 className='text-2xl font-semibold py-2'>
                        Habilidades Desejadas
                    </h2>
                    <div className='flex gap-1'>
                        {project?.skills?.map((skill) => (
                            <Badge key={skill?.id}>{skill?.name}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className='sm:w-[25dvw]'>
                <ProjectSideBar
                    project={project!}
                    entity={entity}
                    logged_as={logged_as}
                />
            </div>
        </main>
    );
}
