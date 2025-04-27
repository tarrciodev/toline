"use server";

import { auth } from "@/auth";
import { api } from "@/config/api";

interface UpdateProjectProps {
    id: string;
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
}

export async function updateBaseProject(
    project: UpdateProjectProps,
    filteredSkills: IFilteredSkills[] | undefined
): Promise<{ status: "updated" | "rejected"; message: string }> {
    const { user } = (await auth()) as { user: { email: string } };

    if (!user) {
        return {
            status: "rejected",
            message: "Você precisa estar logado para atualizar um projeto",
        };
    }

    const me = await api<{ tolinerId: string }>(`/me/${user.email}`, {
        cache: "force-cache",
        next: {
            tags: ["me"],
            revalidate: 180,
        },
    });

    const { id, ...parsedProject } = project;

    console.log({
        remaining: filteredSkills
            ?.filter((filtered) => project.skills?.includes(filtered.name))
            .map((s) => s.id),
    });
    const createdProject = await api<{ id: string }>(
        `/project/${id}/ownerId/${me.tolinerId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: parsedProject.name,
                description: parsedProject.description,
                categoryId: parsedProject.categoryId,
                skills: filteredSkills
                    ?.filter((filtered) =>
                        project.skills?.includes(filtered.name)
                    )
                    .map((s) => s.id),
                subcategoryId: parsedProject.subcategoryId,
            }),
        }
    );

    if (!createdProject?.id) {
        return {
            status: "rejected",
            message: "Erro ao atualizar projeto",
        };
    }

    return {
        status: "updated",
        message: "Projeto atualizado com sucesso",
    };
}
