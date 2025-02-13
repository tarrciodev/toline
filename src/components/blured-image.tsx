"use server";
import { getBluredImage } from "@/utils/get-blured-image";
import Image from "next/image";

interface IBluredImage {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export async function BluredImage({
    src,
    alt,
    className,
    width,
    height,
}: IBluredImage) {
    const { base64, img } = await getBluredImage(src);
    return (
        <Image
            src={img.src}
            width={width ?? img.width}
            height={height ?? img.height}
            alt={alt || ""}
            placeholder='blur'
            blurDataURL={base64}
            className={className}
        />
    );
}
