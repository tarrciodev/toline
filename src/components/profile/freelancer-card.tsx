import { EntityProps } from "@/store/entity";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import Image from "next/image";

export function FreelancerCard({ entity }: { entity: EntityProps }) {
    return (
        <div className='border border-gray-200 rounded p-8 w-full flex gap-2 bg-white shadow-xl'>
            <div>
                {entity.avatarUrl ? (
                    <div className='size-40 rounded-full bg-linear-to-r from-blue-500 to-green-500 p-2 flex items-center justify-center'>
                        <Image
                            src={`https://github.com/tarcisioteixeira.png`}
                            alt='User picture'
                            width={100}
                            height={100}
                            className='rounded-full size-[9.8rem]'
                        />
                    </div>
                ) : (
                    <div className='size-[9.8rem] rounded-full  flex justify-center items-center bg-linear-to-t from-blue-900 to-red-900 text-white'>
                        <p className='text-2xl font-semibold'>
                            {extractAvatarFromName(entity.name)}
                        </p>
                    </div>
                )}
            </div>
            <div className='w-full'>
                <h1 className='text-4xl font-semibold'>{entity?.name}</h1>
                <div className='flex gap-3 px-1'>
                    <p>Desenvolvimento Web</p> /<p>Video Editor</p>
                </div>

                <div className='border-b border-gray-400 w-full my-4' />
                <div>
                    <p className='w-[30dvw] text-justify'>{entity?.bio}</p>
                </div>
            </div>
        </div>
    );
}
