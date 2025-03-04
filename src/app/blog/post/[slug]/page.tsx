import { getPostBySlug } from "@/actions/posts/get-post-by-slug";
import { BluredImage } from "@/components/blured-image";
import { RichTextRender } from "@/components/bolg/rich-text-render";
import { Header } from "@/components/header";

export default async function PostBySlug({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const post = await getPostBySlug(slug);
    const hasCover = post?.cover?.url;
    return (
        <div className='bg-gray-50 min-h-screen'>
            <Header />
            <main className='px-4 sm:px-56 py-8 space-y-5'>
                <div className='flex justify-center flex-col items-center'>
                    {hasCover && (
                        <div className='w-full relative h-[45vh]'>
                            <BluredImage
                                src={post?.cover?.url}
                                alt={post?.title}
                                className='object-cover obsolute  w-full h-full inset-0'
                            />
                            <div className='absolute w-full h-full bg-black/50 inset-0'></div>
                        </div>
                    )}
                    <div className='mx-auto prose-lg z-10 mt-6 pb-24 sm:w-[70vw] text-black px-4'>
                        <h1 className='py-4 text-3xl md:text-5xl'>
                            {post?.title}
                        </h1>
                        <RichTextRender content={post?.content} />
                    </div>
                </div>
            </main>
        </div>
    );
}
