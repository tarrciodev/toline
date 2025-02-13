import { FreelancersProps } from "@/actions/freelancer/get-freelancers";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Freelancer({ freelancer }: { freelancer: FreelancersProps }) {
    return (
        <div className='flex flex-col gap-4 shadow p-4 bg-white border border-gray-100'>
            <div className='flex gap-2 items-center'>
                <div>
                    {freelancer.avatarUrl ? (
                        <div>
                            <Image
                                src={freelancer.avatarUrl}
                                alt='Avatar'
                                width={40}
                                height={40}
                            />
                        </div>
                    ) : (
                        <span className='h-20 w-20 rounded bg-teal-900 p-4 text-teal-50'>
                            {extractAvatarFromName(freelancer.name)}
                        </span>
                    )}
                </div>
                <div>
                    <Link
                        href={`/dash/freelancer/${freelancer.id}`}
                        className='font-semibold hover:underline'
                    >
                        {freelancer.name}
                    </Link>
                    <p className='flex'>
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </p>
                </div>
            </div>
            <div className='flex gap-3'>
                <p>
                    <span>Aderiu</span>: {freelancer.createdAt}
                </p>
                <Link
                    href={`/dash/freelancer/${freelancer.id}`}
                    className='ml-auto bg-black hover:bg-black/90 rounded py-1 px-2 text-white'
                >
                    Ver perfil
                </Link>
            </div>
        </div>
    );
}
