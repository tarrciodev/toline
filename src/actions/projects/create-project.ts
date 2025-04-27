"use server";

import { auth } from "@/auth";
import { api } from "@/config/api";

interface ICreateProjectProps {
    name: string;
    description: string;
    categoryId: string;
    subcategoryId?: string;
    skills?: Array<string>;
}

interface IFilteredSkills {
    id: string;
    name: string;
    description?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
    skills?: Array<string>;
}

export async function createProject(
    project: ICreateProjectProps,
    filteredSkills: IFilteredSkills[] | undefined
): Promise<{ status: "created" | "rejected"; message: string }> {
    const { user } = (await auth()) as { user: { email: string } };

    if (!user) {
        return {
            status: "rejected",
            message: "Você precisa estar logado para criar um projeto",
        };
    }

    const me = await api<{ tolinerId: string }>(`/me/${user.email}`, {
        cache: "force-cache",
        next: {
            tags: ["me"],
            revalidate: 180,
        },
    });
    const createdProject = await api<{ id: string }>(
        `/project/create/${me.tolinerId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: project.name,
                description: project.description,
                categoryId: project.categoryId,
                skills: filteredSkills
                    ?.filter((filtered) =>
                        project.skills?.includes(filtered.name)
                    )
                    .map((s) => s.id),
                subcategoryId: project.subcategoryId,
            }),
        }
    );

    if (!createdProject?.id) {
        return {
            status: "rejected",
            message: "Erro ao criar projeto",
        };
    }

    return {
        status: "created",
        message: "Projeto criado com sucesso",
    };
}
