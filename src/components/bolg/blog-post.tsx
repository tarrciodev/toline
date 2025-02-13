import { getTimeElapsed } from "@/utils/get-time-elapsed";

import { IPost } from "@/actions/posts/get-posts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import readingTime from "reading-time";
import { BluredImage } from "../blured-image";

interface IBlogPostProps {
    post: IPost;
}
export default function BlogPost({ post }: IBlogPostProps) {
    const hasAvatar = post?.cover?.url;
    const readin = readingTime(post!.content!).text.replace(
        "read",
        "de leitura"
    );
    return (
        <Link
            href={`/blog/post/${post.slug}`}
            prefetch
            className='shadow-xl border border-gray-50 rounded-xl overflow-hidden flex flex-col'
        >
            <div className='flex flex-col flex-1'>
                {post?.cover?.url && (
                    <div className='w-full'>
                        <BluredImage
                            src={post?.cover?.url}
                            className="className='w-full object-cover h-[30vh] w-full"
                            alt='post cover'
                        />
                    </div>
                )}
                <div className='space-y-4 px-4 py-5'>
                    <p className='font-semibold text-blue-700'>{post?.title}</p>
                    <p
                        className={cn(
                            "text-sm",
                            hasAvatar ? "line-clamp-2" : "line-clamp-6"
                        )}
                    >
                        {post.excerpt}
                    </p>
                </div>
            </div>
            <p className='flex items-center justify-between text-sm w-full font-thin px-4 py-5'>
                <span>{readin}</span>{" "}
                <span>
                    {getTimeElapsed(post?.createdAt).replace("em", "há")}
                </span>
            </p>
        </Link>
    );
}
