import { prisma } from "@/config/prisma";

type IEvaluation = {
    id: "Excelente" | "Razoavel" | "Amador";
    rate: string;
    freelancerId: string;
    evaluatorId: string;
    comment: string;
};

export async function createEvaluation({
    evaluation,
}: {
    evaluation: IEvaluation;
}) {
    const newEvaluation = await prisma.freelancerEvaluation.create({
        data: evaluation,
    });

    return newEvaluation;
}
