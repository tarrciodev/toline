import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function GoBack({ href }: { href: string }) {
    return (
        <Link href={href} className='absolute left-0 top-1'>
            <ArrowLeft />
        </Link>
    );
}
