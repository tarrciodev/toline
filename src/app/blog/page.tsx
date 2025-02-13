import { getPosts } from "@/actions/posts/get-posts";
import BlogPost from "@/components/bolg/blog-post";
import { Header } from "@/components/header";

export default async function Blog() {
    const { hasNextPage, hasPreviousPage, posts, totalPages, totalPosts } =
        await getPosts(1);
    console.log({
        hasNextPage,
        hasPreviousPage,
        posts,
        totalPages,
        totalPosts,
    });

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Header />
            <main className='px-56 py-8 space-y-5'>
                <h1 className='font-semibold text-2xl'>
                    Por dentro das Novidades
                </h1>
                <div className='grid grid-cols-3 gap-4'>
                    {posts.map((post) => (
                        <BlogPost post={post} key={post.slug} />
                    ))}
                </div>
            </main>
        </div>
    );
}
