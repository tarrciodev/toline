"use client";

// import { ProjectsOfinterest } from "@/components/dash/projects-of-interest";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EntityProps } from "@/store/entity";
import { useSessionStore } from "@/store/session";
import Link from "next/link";

export function DashContent({
    toliner,
    children,
}: {
    toliner: EntityProps;
    children?: React.ReactNode;
}) {
    const { logged_as } = useSessionStore();
    return (
        <div>
            <Card className='flex-1 rounded px-4 w-full'>
                <CardHeader>
                    {logged_as === "client" ? (
                        <Link
                            href={`/dash/client/projects`}
                            className='text-lg font-semibold cursor-pointer'
                        >
                            <p className='bg-zinc-300 rounded-xl w-fit px-3 py-1'>
                                Meus Projetos{" "}
                            </p>
                        </Link>
                    ) : (
                        <p>Projetos de Interesse</p>
                    )}
                </CardHeader>
                {logged_as == "freelancer" ? (
                    <>
                        {children}
                        <div className='flex justify-end py-4'>
                            <Link
                                href='/dash/projects'
                                className='p-2 bg-zinc-300 rounded-xl hover:bg-zinc-200 cursor-pointer'
                            >
                                ver todos os projetos
                            </Link>
                        </div>
                    </>
                ) : (
                    <CardContent className='flex justify-center gap-2 items-center'>
                        <p className='text-xl'>
                            {toliner.projects?.length != 0
                                ? `${toliner.projects?.length}`
                                : "sem"}{" "}
                            projetos publicados
                        </p>
                        <Link
                            href='/dash/project/new'
                            prefetch
                            className='px-4 rounded-lg py-2 bg-blue-600 text-blue-50'
                        >
                            Publicar Projeto
                        </Link>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
