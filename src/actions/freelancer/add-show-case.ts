/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { api } from "@/config/api";
import { ShowCaseProps } from "@/services/freelancers/add-portifolio-service";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";
import { getSkills } from "../skills/get-skills";

export async function addShowCase(data: ShowCaseProps, freelancerId: string) {
    if (!freelancerId) {
        return {
            status: "error",
            message: "Nenhum usuario encontrado.",
        };
    }

    const cover = await supabaseUpload(data.cover);

    if (!cover) {
        return {
            status: "error",
            message: "Erro ao carregar cover.",
        };
    }

    const skills = await getSkills();
    const selectedSkills = skills
        .filter((skill) => data?.skills?.includes(skill.name))
        .map((skill) => skill.id);

    try {
        const parseAssets = data.assets.map(async (asset) => {
            const link = await supabaseUpload(asset);
            return link;
        });

        const assets = (await Promise.all(parseAssets)).filter(
            (data) => data != null
        );

        const portifolio = await api(
            `/freelancer/${freelancerId}/add-portifolio`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    cover,
                    assets: assets,
                    skills: selectedSkills,
                    completedAt: data.completedAt,
                }),
            }
        );

        console.log({ portifolio });

        revalidatePath("/");

        return {
            status: "success",
            message: "showcase adicionado com sucesso...",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Erro ao carregar assests",
        };
    }
}
