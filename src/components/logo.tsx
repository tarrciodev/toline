import Image from "next/image";
import Link from "next/link";
import toline from "../assets/toline.jpeg";

export function Logo({ redirectTo }: { redirectTo: string }) {
    return (
        <Link href={redirectTo}>
            <Image
                src={toline.src}
                alt='toline'
                width={150}
                height={150}
                className='object-cover h-16 w-56 -ml-11'
            />
        </Link>
    );
}
