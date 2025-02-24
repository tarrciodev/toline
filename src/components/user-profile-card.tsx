import { getMe } from "@/actions/users/get-me";
import { PencilLine, Star } from "lucide-react";
import Link from "next/link";
import { ProfileCompletation } from "./profile/profile-completation";
import { Card, CardContent, CardHeader } from "./ui/card";

export async function UserProfileCard() {
    const me = await getMe();
    return (
        <Link href={`/dash/profile/${me.id}`}>
            <Card className='rounded sm:w-[25vw]'>
                <CardHeader className='flex-row justify-between w-full'>
                    <span>Meu Perfil</span>
                    <span className='cursor-pointer'>
                        <PencilLine />
                    </span>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-3'>
                        <span className='size-20 flex items-center justify-center bg-purple-800 text-purple-50 text-xl'>
                            T
                        </span>
                        <div>
                            <p>Tarcísio Teixeira</p>
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
            </Card>
        </Link>
    );
}
