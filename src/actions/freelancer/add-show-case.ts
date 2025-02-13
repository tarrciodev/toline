/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { ShowCaseProps } from "@/components/forms/add-projects-form";
import { prisma } from "@/config/prisma";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";
import { getSkills } from "../skills/get-skills";

export async function addShowCase(data: ShowCaseProps, entityId: string) {
    if (!entityId) {
        return {
            status: "error",
            message: "Nenhum usuario encontrado.",
        };
    }

    const entityExists = await prisma.freelancer.findFirst({
        where: {
            id: entityId,
        },
    });

    if (!entityExists) {
        return {
            status: "error",
            message: "Nenhum usuario encontrado.",
        };
    }

    const url = await supabaseUpload(data.cover);

    if (!url) {
        return {
            status: "error",
            message: "Erro ao carregar cover.",
        };
    }

    const skills = await getSkills();
    const selectedSkills = skills
        .filter((skill) => data?.skills?.includes(skill.name))
        .map((skill) => {
            return {
                id: skill.id,
            };
        });

    try {
        const portifolio = await prisma.portifolio.create({
            data: {
                title: data.title,
                description: data.description,
                cover: url as string,
                freelancer: {
                    connect: {
                        id: entityId,
                    },
                },
                skills: {
                    connect: selectedSkills,
                },
                completedAt: data.concluedAt,
            },
        });

        const parseAssets = data.assets.map(async (asset) => {
            const link = await supabaseUpload(asset);
            return {
                link: link as string,
                portifolioId: portifolio.id,
            };
        });

        const assets = (await Promise.all(parseAssets)).filter(
            (data) => data.link != null
        );

        console.log({ assets });

        await prisma.portifolioAssets.createMany({
            data: assets,
        });

        revalidatePath("/");

        return {
            status: "success",
            message: "showcase adicionado com sucesso...",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Erro ao carregar assests",
        };
    }
}
