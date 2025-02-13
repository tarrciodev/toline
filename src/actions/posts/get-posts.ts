/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { useQuery } from "@/graphql/client";
import { GET_ALL_POSTS } from "@/graphql/queries/posts";

export interface IPost {
    title: string;
    slug: string;
    cover: {
        url: string;
    };
    excerpt: string;
    createdAt: Date;
    content: string;
}

export interface IGetPostsProps {
    posts: IPost[];
    totalPages: number;
    hasNextPage: boolean;
    totalPosts: number;
    hasPreviousPage: boolean;
}

export async function getPosts(page: number): Promise<IGetPostsProps> {
    const data = (await useQuery.request(GET_ALL_POSTS, {
        first: 12,
        skip: (page - 1) * 10,
    })) as any;

    const totalPosts = data?.postsConnection?.aggregate?.count;
    const pageInfo = data?.postsConnection?.pageInfo;
    const posts = data?.postsConnection?.edges?.map((post: any) => {
        return post.node;
    });

    const parsedPosts = posts?.map((post: any) => {
        return {
            ...post,
            content: post?.content?.html,
        };
    });

    return {
        posts: parsedPosts,
        totalPages: Math.ceil(totalPosts / 10),
        hasNextPage: pageInfo?.hasNextPage,
        hasPreviousPage: pageInfo?.hasPreviousPage,
        totalPosts,
    };
}
