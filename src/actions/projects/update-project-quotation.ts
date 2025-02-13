/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { EditProjectFormProps } from "@/components/dash/edit-project-Qoutation-button";
import { prisma } from "@/config/prisma";

export async function updateProjectQuotation({
    formData,
    dependencies,
}: {
    formData: EditProjectFormProps;
    dependencies: {
        projectId: string;
        quotationId: string;
        clientId: string;
    };
}) {
    if (!dependencies.projectId) {
        return {
            status: "error",
            message: "Project not found",
        };
    }

    const isAuthorized = await prisma.project.findFirst({
        where: {
            id: dependencies.projectId,
            ownerId: dependencies.clientId,
        },
    });

    if (!isAuthorized) {
        return {
            status: "error",
            message: "You are not authorized to update this project",
        };
    }

    if (dependencies.quotationId) {
        try {
            await prisma.quotation.update({
                where: {
                    id: dependencies.quotationId,
                },
                data: {
                    ammount: Number(formData.ammount),
                    description: formData.description,
                },
            });

            return {
                status: "success",
                message: "quotation updated successfully",
            };
        } catch (e) {
            return {
                status: "error",
                message: "Error updating qoutation",
            };
        }
    }

    try {
        await prisma.quotation.create({
            data: {
                ammount: Number(formData.ammount),
                description: formData.description,
                project: {
                    connect: {
                        id: dependencies.projectId,
                    },
                },
            },
        });

        return {
            status: "success",
            message: "Qoutation created successfully",
        };
    } catch (e) {
        return {
            status: "error",
            message: "Error creating qoutation",
        };
    }
}
