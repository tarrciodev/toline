"use server";
import { auth } from "@/auth";
import { prisma } from "@/config/prisma";

interface ICreateProjectProps {
    name: string;
    description: string;
    categoryId: string;
    skills?: Array<string>;
}

interface IFilteredSkills {
    id: string;
    name: string;
    description?: string | null;
    categoryId?: string | null;
    subcategoryId?: string | null;
}

export async function createProject(
    project: ICreateProjectProps,
    filteredSkills: IFilteredSkills[] | undefined
): Promise<{ status: "created" | "rejected"; message: string }> {
    const {
        user: { email },
    } = (await auth()) as { user: { email: string } };
    if (!email) return { status: "rejected", message: "Usuario não logado" };

    const owner = await prisma.client.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });

    if (!owner) return { status: "rejected", message: "Usuário não logado" };

    const parsedSliks = filteredSkills
        ?.filter((skill) => project.skills?.includes(skill.name))
        .map((skill) => skill.id);
    console.log(parsedSliks);
    const newProject = await prisma.project.create({
        data: {
            name: project.name,
            description: project.description,
            category: {
                connect: {
                    id: project.categoryId,
                },
            },
            skills: parsedSliks as string[],
            owner: {
                connect: {
                    id: owner.id,
                },
            },
            status: "Não Iniciado",
        },
    });

    if (!newProject) {
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
