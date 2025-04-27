"use server";

import { useQuery } from "@/graphql/client";
import { GET_BANNER } from "@/graphql/queries/banner";

export interface IBanner {
    title: string;
    avaialbleAt: string;
    isLive: boolean;
    description: string;
    url: string;
    cover: {
        url: string;
    };
}

export async function getBanner(): Promise<IBanner> {
    const data = (await useQuery.request(GET_BANNER)) as {
        banners: {
            title: string;
            avaialbleAt: string;
            isLive: boolean;
            description: string;
            url: string;
            cover: {
                url: string;
            };
        }[];
    };

    return data.banners[0];
}
