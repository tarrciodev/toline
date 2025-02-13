"use server";

import { prisma } from "@/config/prisma";

export type FreelancersProps = {
    id: string;
    name: string;
    isVerified: boolean;
    avatarUrl: string;
    createdAt: string;
};

export async function getFreelancers(
    especialization: string | null,
    skills: string[] | null
): Promise<FreelancersProps[]> {
    const freelancers = await prisma.freelancer.findMany({
        where: {
            especialiazation: especialization
                ? {
                      some: {
                          slug: {
                              contains: (especialization as string) ?? "",
                          },
                      },
                  }
                : {
                      none: {
                          slug: {
                              in: [],
                          },
                      },
                  },
            skills: skills
                ? {
                      some: {
                          name: {
                              in: skills,
                              mode: "insensitive",
                          },
                      },
                  }
                : {
                      none: {
                          name: {
                              in: [],
                          },
                      },
                  },
        },
        select: {
            id: true,
            name: true,
            isVerified: true,
            avatarUrl: true,
            createdAt: true,
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseFreelancers = freelancers.map((freelancer: any) => {
        return {
            id: freelancer.id,
            name: freelancer.name,
            isVerified: freelancer.isVerified,
            avatarUrl: freelancer.avatarUrl as string,
            createdAt: freelancer.createdAt.toLocaleDateString(),
        };
    });

    return parseFreelancers;
}
