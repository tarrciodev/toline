"use client";
import { removeFreelancerFromMyProject } from "@/actions/client/remove-freelancer-from-my-project";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { Loader } from "./loader";
import { ISubscriptionFullProps } from "./subscriber";
import { Button } from "./ui/button";

export function SelectedFreelancer({
    subscription,
    entityId,
    projectId,
}: ISubscriptionFullProps) {
    const [isPending, startTransition] = useTransition();
    function handleHireFreelancerOnMyProject() {
        startTransition(async () => {
            const data = await removeFreelancerFromMyProject({
                projectId,
                entityId,
                freelancerId: subscription.freelancer.id,
            });
            console.log(data);
        });
    }
    return (
        <div className='flex flex-col gap-4 shadow p-4 bg-white border border-gray-100'>
            <div className='flex gap-2 items-center'>
                <div>
                    {subscription.freelancer.avatarUrl ? (
                        <div>
                            <Image
                                src={subscription.freelancer.avatarUrl}
                                alt='Avatar'
                                width={40}
                                height={40}
                            />
                        </div>
                    ) : (
                        <span className='h-20 w-20 rounded bg-teal-900 p-4 text-teal-50'>
                            {extractAvatarFromName(
                                subscription.freelancer.name
                            )}
                        </span>
                    )}
                </div>
                <div>
                    <Link
                        href={`/dash/freelancers/${subscription.freelancer.id}`}
                        className='font-semibold hover:underline'
                    >
                        {subscription.freelancer.name}
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
            <div className='flex gap-3 justify-between'>
                <p>
                    <span>Mensagens: 0</span>
                </p>
                <Button
                    className='ml-auto bg-red-700 hover:bg-red-500'
                    disabled={isPending}
                    onClick={handleHireFreelancerOnMyProject}
                >
                    {isPending && <Loader />}Remover
                </Button>
            </div>
        </div>
    );
}
