/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichText } from "@graphcms/rich-text-react-renderer";
import { BluredImage } from "../blured-image";

const renderers = {
    h1: ({ children }: { children: any }) => (
        <h1 className='text-black text-xl'>{children}</h1>
    ),
    p: ({ children }: { children: any }) => (
        <p className='text-black'>{children}</p>
    ),
    a: ({ children, href }: { children: any; href?: any }) => (
        <a href={href} className='text-blue-500'>
            {children}
        </a>
    ),
    bold: ({ children }: { children: any }) => <strong>{children}</strong>,
    image: ({ src, alt }: { src: any; alt?: any }) => (
        <BluredImage src={src} alt={alt} className='w-full' />
    ),
    video: ({ src }: { src?: any }) => (
        <video src={src} controls className='w-full' />
    ),
};

export function RichTextRender({ content }: { content: any }) {
    return (
        <div>
            <RichText content={content} renderers={renderers} />
        </div>
    );
}
