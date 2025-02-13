"use server";

import { prisma } from "@/config/prisma";
import { supabaseUpload } from "@/utils/supabase-upload";
import { getUserAsEntity } from "../users/get-entity";

export async function updateFreelancerIdentification(
    file: File,
    type: "BIFront" | "BIBack"
): Promise<{ status: "error" | "success"; message: string }> {
    const response = await getUserAsEntity();
    console.log(response);
    if (response.status == "error") {
        return {
            status: "error",
            message: "Entity not found",
        };
    }

    const entity = response.data;

    if (!file) {
        return {
            status: "error",
            message: "File not found",
        };
    }

    const url = await supabaseUpload(file);

    if (type === "BIFront") {
        await prisma.identification.create({
            data: {
                freelancerId: entity?.id as string,
                front: url as string,
                back: "",
            },
        });

        return {
            status: "success",
            message: "Front updated successfully",
        };
    }

    const updateBack = await prisma.identification.update({
        where: {
            freelancerId: entity?.id,
        },
        data: {
            back: url as string,
        },
    });

    if (!updateBack) {
        return {
            status: "error",
            message: "Back updated failed",
        };
    }

    await prisma.freelancer.update({
        where: {
            id: entity?.id,
        },
        data: {
            isVerified: true,
        },
    });

    return {
        status: "success",
        message: "Back updated successfully",
    };
}
