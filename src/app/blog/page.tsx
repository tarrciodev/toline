import { getPosts } from "@/actions/posts/get-posts";
import BlogPost from "@/components/bolg/blog-post";
import { Header } from "@/components/header";

export default async function Blog() {
    const { posts } = await getPosts(1);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Header />
            <main className='px-4 sm:px-20 md:px-40 lg:px-56 py-8 space-y-5'>
                <h1 className='font-semibold text-2xl'>
                    Por dentro das Novidades
                </h1>
                <div className='grid  sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {posts.map((post) => (
                        <BlogPost post={post} key={post.slug} />
                    ))}
                </div>
            </main>
        </div>
    );
}
