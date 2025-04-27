"use client";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SubscriptionDetails } from "./dash/subscription-details";

export interface ISubscription {
    id: string;
    toliner: {
        id: string;
        name: string;
        avatarUrl?: string;
        userId: string;
    };
    estimatedTime: string;
    requiredInformations: string;
    quotation: number;
    similarExperiences: string;
    createdAt: string;
}

export interface ISubscriptionFullProps {
    ownerId: string;
    projectId: string;
    subscription: ISubscription;
}

export function Subscriber({
    subscription,
    ownerId,
    projectId,
}: ISubscriptionFullProps) {
    return (
        <div className='flex flex-col gap-4 shadow-sm p-4 bg-white border border-gray-100'>
            <div className='flex gap-2 items-center'>
                <div>
                    {subscription.toliner.avatarUrl ? (
                        <div>
                            <Image
                                src={subscription.toliner.avatarUrl}
                                alt='Avatar'
                                width={40}
                                height={40}
                            />
                        </div>
                    ) : (
                        <span className='h-20 w-20 rounded bg-teal-900 p-4 text-teal-50'>
                            {extractAvatarFromName(subscription.toliner.name)}
                        </span>
                    )}
                </div>
                <div>
                    <Link
                        href={`/dash/freelancers/${subscription.toliner.id}`}
                        className='font-semibold hover:underline'
                    >
                        {subscription.toliner.name}
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
            <div className='flex flex-col gap-3'>
                <div className='flex gap-3'>
                    <p>
                        <span>Submetido</span>: {subscription.createdAt}
                    </p>
                    <p>
                        <span>Mensagens: 0</span>
                    </p>
                </div>
                <SubscriptionDetails
                    subscription={subscription}
                    dependencies={{ projectId, ownerId }}
                />
            </div>
        </div>
    );
}
