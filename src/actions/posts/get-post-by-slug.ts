/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { useQuery } from "@/graphql/client";
import { GET_POST_BY_SLUG } from "@/graphql/queries/posts";

interface IPostBySlug {
    title: string;
    slug: string;
    cover: {
        url: string;
    };
    excerpt: string;
    createdAt: Date;
    content: any;
}

export async function getPostBySlug(slug: string): Promise<IPostBySlug> {
    const data = (await useQuery.request(GET_POST_BY_SLUG, { slug })) as any;
    const formatedPost = {
        ...data.post,
        content: data.post?.content?.json,
    };

    return formatedPost;
}
