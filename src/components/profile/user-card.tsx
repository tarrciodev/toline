import { UpdateUserCard } from "@/app/dash/profile/[id]/(components)/update-user-card";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import Image from "next/image";

interface Entity {
    avatarUrl: string | null;
    name: string;
    jobDescription?: string;
    bio: string;
}

export function UserCard({ entity }: { entity: Entity }) {
    return (
        <div className='border border-gray-200 rounded p-4 sm:p-8 w-full flex gap-2 bg-white shadow-xl relative'>
            <span className='absolute right-5 top-5'>
                <UpdateUserCard />
            </span>
            <div>
                {entity.avatarUrl ? (
                    <div className='size-10 sm:size-40 rounded-full bg-linear-to-r from-blue-500 to-green-500 flex items-center justify-center'>
                        <Image
                            src={entity.avatarUrl}
                            alt='User picture'
                            width={100}
                            height={100}
                            className='rounded-full size-9 sm:size-[9.8rem] object-cover'
                        />
                    </div>
                ) : (
                    <div className='size-20 sm:size-[9.8rem] rounded-full  flex justify-center items-center bg-linear-to-t from-blue-900 to-red-900 text-white'>
                        <p className='text-2xl font-semibold'>
                            {extractAvatarFromName(entity.name)}
                        </p>
                    </div>
                )}
            </div>
            <div className='w-full'>
                <h1 className='text-xl sm:text-4xl font-semibold'>
                    {entity?.name}
                </h1>
                <div className='flex flex-col sm:flex-row sm:gap-3 px-1'>
                    <p>{entity?.jobDescription ?? "Toline Freelancer"}</p>
                </div>

                <div className='border-b border-gray-400 w-full my-4' />
                <div>
                    <p className='sm:w-[30dvw]  text-left sm:text-justify -ml-20 sm:-ml-0'>
                        {entity.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
