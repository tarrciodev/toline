import notfound from "@/assets/not-found.jpg";
import Image from "next/image";

export function NotFoundFilter() {
    return (
        <div>
            <Image
                src={notfound.src}
                alt='not found'
                width={250}
                height={250}
            />
        </div>
    );
}
