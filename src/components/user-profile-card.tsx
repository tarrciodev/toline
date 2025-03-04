import { getMe } from "@/actions/users/get-me";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { ProfileCompletation } from "./profile/profile-completation";
import { Card, CardContent, CardHeader } from "./ui/card";

export async function UserProfileCard() {
    const me = await getMe();
    return (
        <Link href={`/dash/profile/${me?.id}`}>
            <Card className='rounded sm:w-[25vw]'>
                <CardHeader className='flex-row justify-between w-full'>
                    <span>Meu Perfil</span>
                    <span className='cursor-pointer'>
                        <PencilLine />
                    </span>
                </CardHeader>
                <CardContent>
                    {/* <div className='flex gap-3'>
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
                    </div> */}
                    <div className='mt-6'>
                        <ProfileCompletation
                            profileCompletation={50}
                            legended
                        />
                    </div>
                    <div></div>
                </CardContent>
            </Card>
        </Link>
    );
}
