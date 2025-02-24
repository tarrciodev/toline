"use server";
import { api } from "@/config/api";

interface IMarkProjectAsConcluedeProps {
    dependencies: {
        clientId: string;
        projectId: string;
        freelancerId: string;
    };
    data: {
        rate: string;
        comment: string;
    };
}
export async function markProjectAsConcluded({
    data,
    dependencies,
}: IMarkProjectAsConcluedeProps) {
    const { clientId, projectId, freelancerId } = dependencies;
    if (!clientId || !projectId || !freelancerId) {
        return {
            status: "error",
            message: "Invalid data provided",
        };
    }

    const project = await api<{ id: string }>(
        `/client/${clientId}/project/${projectId}/conclude`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rate: data.rate,
                comment: data.comment,
                freelancerId,
            }),
        }
    );

    if (!project.id) {
        return {
            status: "error",
            message: "Failed to mark project as concluded",
        };
    }

    return {
        status: "success",
        message: "Project marked as concluded",
    };
}
