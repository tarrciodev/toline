"use server";

import { prisma } from "@/config/prisma";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserAsEntity } from "../users/get-entity";

const schema = z.object({
    file: z.instanceof(File),
    certificationName: z.string().min(1, "Certificação inválida"),
});

export async function addFreelancerCertification(
    _: unknown,
    formData: FormData
) {
    const file = formData.get("file") as File;
    const certificationName = formData.get("certificationName") as string;

    const parsed = schema.safeParse({ file, certificationName });
    if (!parsed.success) {
        return {
            status: "error",
            message: "Certificação inválida",
        };
    }

    const response = await getUserAsEntity();

    if (response.status == "error") {
        return {
            status: "error",
            message: "Erro ao adicionar certificação",
        };
    }
    const entity = response.data;
    const url = await supabaseUpload(file);
    const certification = await prisma.certification.create({
        data: {
            certificationName: certificationName,
            link: url as string,
            freelancer: {
                connect: {
                    id: entity?.id as string,
                },
            },
        },
    });

    revalidatePath("/");

    return certification;
}
