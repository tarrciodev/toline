import Image from "next/image";
import Link from "next/link";
import toline from "../assets/logo.png";

export function Logo({ redirectTo }: { redirectTo: string }) {
    return (
        <Link href={redirectTo} className='flex items-center gap-2 h-16 py-3'>
            <Image
                src={toline.src}
                alt='toline'
                width={150}
                height={150}
                className='object-cover h-20 w-56 -ml-11 mt-4 bg-white rounded-lg'
            />
        </Link>
    );
}
