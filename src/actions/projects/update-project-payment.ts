/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import {
    PaymentDependencies,
    ProjectPaymentProps,
} from "@/components/dash/edit-project-payment-button";
import { prisma } from "@/config/prisma";
import { supabaseUpload } from "@/utils/supabase-upload";

export async function updateProjectPayment({
    data,
    dependencies,
}: {
    data: ProjectPaymentProps;
    dependencies: PaymentDependencies;
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
        select: {
            payment: {
                select: {
                    id: true,
                    clientInvoce: true,
                },
            },
            dueDate: true,
        },
    });

    if (!isAuthorized) {
        return {
            status: "error",
            message: "You are not authorized to update this project",
        };
    }

    let invoince;
    if (data.file) {
        const url = await supabaseUpload(data.file);
        invoince = url;
    }

    if (dependencies.paymentId) {
        try {
            await prisma.payment.update({
                where: {
                    id: dependencies.paymentId,
                },
                data: {
                    ammount: Number(data.ammount),
                    clientInvoce:
                        typeof invoince === "string"
                            ? invoince
                            : isAuthorized.payment?.clientInvoce,
                    verifiedFromSystem: false,
                },
            });

            if (data.date) {
                await prisma.project.update({
                    where: {
                        id: dependencies.projectId,
                    },
                    data: {
                        dueDate: data.date,
                    },
                });
            }

            return {
                status: "success",
                message: "Project updated successfully",
            };
        } catch (error) {
            return {
                status: "error",
                message: "Error updating project",
            };
        }
    }

    try {
        await prisma.payment.create({
            data: {
                ammount: Number(data.ammount),
                clientInvoce:
                    typeof invoince === "string"
                        ? invoince
                        : isAuthorized.payment?.clientInvoce,
                project: {
                    connect: {
                        id: dependencies.projectId,
                    },
                },
                verifiedFromSystem: false,
            },
        });

        if (data.date) {
            await prisma.project.update({
                where: {
                    id: dependencies.projectId,
                },
                data: {
                    dueDate: data.date,
                },
            });
        }

        return {
            status: "success",
            message: "Project updated successfully",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Error updating project",
        };
    }
}
