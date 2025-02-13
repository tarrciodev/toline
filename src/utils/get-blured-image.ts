import { getPlaiceholder } from "plaiceholder";

export async function getBluredImage(src: string) {
    const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
    );

    const {
        metadata: { height, width },
        ...placeholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
        ...placeholder,
        img: { src, height, width },
    };
}

export const runtime = "nodejs";
