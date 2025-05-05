import { FreelancersProps } from "@/actions/freelancer/get-freelancers";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function Freelancer({ freelancer }: { freelancer: FreelancersProps }) {
    return (
        <div className='flex flex-col sm:flex-row shadow-sm gap-4 p-4 bg-white border border-gray-100 items-start'>
            <div className='flex justify-center w-full sm:w-fit sm:justify-items-start'>
                {freelancer.avatarUrl ? (
                    <div>
                        <Image
                            src={freelancer.avatarUrl}
                            alt='Avatar'
                            width={40}
                            height={40}
                            className='sm'
                        />
                    </div>
                ) : (
                    <span className='h-20 w-20 rounded-full sm:rounded bg-teal-900 p-4 text-teal-50 flex items-center justify-center'>
                        {extractAvatarFromName(freelancer.name)}
                    </span>
                )}
            </div>

            <div className='flex flex-col w-full'>
                <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start sm:justify-between gap-4'>
                    <div>
                        <Link
                            href={`/dash/freelancer/${freelancer.id}`}
                            className='font-semibold hover:underline text-xl'
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
                    {/* <Button className='bg-teal-900 w-fit self-center'>
                        Convidar
                    </Button> */}
                </div>
                <p className='my-2 line-clamp-3'>{freelancer.bio}</p>
                {freelancer?.skills?.length > 0 && (
                    <div>
                        <p className='font-semibold'>Skills</p>
                        {freelancer.skills.map((skill) => (
                            <Badge key={skill.id}>{skill.name}</Badge>
                        ))}
                    </div>
                )}
                <p className='mt-3 sm:mt-0'>
                    <span>Aderiu</span>: {freelancer.createdAt}
                </p>
            </div>
        </div>
    );
}
