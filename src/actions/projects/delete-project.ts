"use server";

import { api } from "@/config/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProject({
    projectId,
    ownerId,
}: {
    projectId: string;
    ownerId: string;
}) {
    const deleteTedProject = await api<{ id: string }>(
        `/projects/${projectId}/owner/${ownerId}/delete`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId,
                ownerId,
            }),
        }
    );

    console.log({ deleteTedProject });

    if (!deleteTedProject.id) {
        return {
            status: "error",
        };
    }

    revalidatePath("/dash/client/projects");

    redirect("/dash/client/projects");
}
