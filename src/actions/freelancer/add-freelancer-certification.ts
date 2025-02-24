"use server";

import { revalidatePath } from "next/cache";

export async function addFreelancerCertification(
    _: unknown,
    formData: FormData
) {
    const file = formData.get("file") as File;
    const certificationName = formData.get("certificationName") as string;

    const certification = {
        file,
        certificationName,
    };

    revalidatePath("/");

    return certification;
}
