"use client";
import { removeFreelancerFromMyProject } from "@/actions/client/remove-freelancer-from-my-project";
import { cn } from "@/lib/utils";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { Loader } from "./loader";
import { Button } from "./ui/button";

interface ISelectedFreelancerProps {
    freelancer: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    ownerId: string;
    projectId: string;
    projectStatus: "onGoing" | "completed";
}
export function SelectedFreelancer({
    freelancer,
    ownerId,
    projectId,
    projectStatus,
}: ISelectedFreelancerProps) {
    const [isPending, startTransition] = useTransition();
    function handleHireFreelancerOnMyProject() {
        startTransition(async () => {
            await removeFreelancerFromMyProject({
                projectId,
                ownerId,
                freelancerId: freelancer.id,
            });
        });
    }

    const isDisabled = isPending || projectStatus === "completed";

    return (
        <div className='flex flex-col gap-4 shadow-sm p-4 bg-white border border-gray-100'>
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
                        href={`/dash/freelancers/${freelancer.id}`}
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
            <div className='flex gap-3 justify-between'>
                <p>
                    <span>Mensagens: 0</span>
                </p>
                <Button
                    className={cn(
                        "ml-auto",
                        projectStatus === "completed"
                            ? "cursor-not-allowed bg-red-100 text-red-600 hover:bg-red-100"
                            : "bg-red-700 hover:bg-red-500"
                    )}
                    disabled={isDisabled}
                    onClick={handleHireFreelancerOnMyProject}
                >
                    {isPending && <Loader />}Remover
                </Button>
            </div>
        </div>
    );
}
