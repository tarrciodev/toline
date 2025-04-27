import { getMe } from "@/actions/users/get-me";
import { PencilLine, Star } from "lucide-react";
import Link from "next/link";
import { BluredImage } from "./blured-image";
import { ProfileCompletation } from "./profile/profile-completation";
import { TeamsIcon } from "./svg-icons/teams";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export async function UserProfileCard() {
    const me = await getMe();
    return (
        <Card className='rounded sm:w-[25vw] h-fit'>
            <Link href={`/dash/profile/${me?.id}`}>
                <CardHeader className='flex-row justify-between w-full'>
                    <span>Meu Perfil</span>
                    <span className='cursor-pointer'>
                        <PencilLine />
                    </span>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-3'>
                        {me.avatarUrl ? (
                            <div className='size-20 bg-linear-to-l from-teal-800 to-blue-800 p-[0.10rem]'>
                                <BluredImage
                                    src={me.avatarUrl}
                                    alt='user avatar'
                                />
                            </div>
                        ) : (
                            <span className='size-20 flex items-center justify-center bg-purple-800 text-purple-50 text-xl'>
                                T
                            </span>
                        )}
                        <div>
                            <p>{me.username}</p>
                            <span className='flex gap-2'>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </span>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <ProfileCompletation
                            profileCompletation={50}
                            legended
                        />
                    </div>
                    <div></div>
                </CardContent>
            </Link>
            <CardFooter className='flex items-center justify-center'>
                <Link
                    href='https://teams.live.com/l/community/FEALCz_BIyvKkOqxgU'
                    target='blank'
                    className=' w-full flex justify-center items-center gap-2 bg-blue-700 rounded-xl p-2 hover:bg-blue-800 text-blue-50 cursor-pointer'
                >
                    <TeamsIcon /> Junte se a nossa comunidade
                </Link>
            </CardFooter>
        </Card>
    );
}
