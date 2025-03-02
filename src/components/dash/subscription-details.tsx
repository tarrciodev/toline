"use client";
import { hireFreelancerOnMyProject } from "@/actions/client/hire-freelancer-on-my-project";
import {
    Disclosure,
    DisclosureContent,
    DisclosureTrigger,
} from "@/components/ui/disclosure";
import { useTransition } from "react";
import { Loader } from "../loader";
import { ISubscription } from "../subscriber";
import { Button } from "../ui/button";
import { ChatWithEntity } from "./chat/chat-with-entity";

export function SubscriptionDetails({
    subscription,
    dependencies,
}: {
    subscription: ISubscription;
    dependencies: { projectId: string; ownerId: string };
}) {
    const [isPending, startTransition] = useTransition();
    function handleHireFreelancerOnMyProject() {
        startTransition(async () => {
            await hireFreelancerOnMyProject({
                projectId: dependencies.projectId,
                ownerId: dependencies.ownerId,
                freelancerId: subscription.freelancer.id,
            });
        });
    }
    return (
        <Disclosure className='rounded-md '>
            <DisclosureTrigger>
                <button
                    className='w-full py-2 text-left text-sm cursor-pointer'
                    type='button'
                >
                    Detalhes da proposta
                </button>
            </DisclosureTrigger>
            <DisclosureContent className='border border-zinc-200 bg-zinc-100'>
                <div className='p-4'>
                    <div className='flex gap-2'>
                        <p className='font-semibold'>Tempo de entrega:</p>
                        <span>{subscription.estimatedTime}</span>
                    </div>
                    <div className='flex gap-2'>
                        <p className='font-semibold'>
                            Informações necessárias:
                        </p>
                        <span>{subscription.requiredInformations}</span>
                    </div>
                    <div className='flex gap-2'>
                        <p className='font-semibold'>Experiencias Similares:</p>
                        <span>{subscription.similarExperiences}</span>
                    </div>
                    <div className='flex gap-2'>
                        <p className='font-semibold'>Valor Estimado:</p>
                        <span>{subscription.quotation}</span>
                    </div>

                    <div className='flex w-full items-center justify-end gap-2'>
                        <ChatWithEntity
                            entityId={subscription.freelancer.userId}
                            entityType='freelancer'
                        />
                        <Button
                            disabled={isPending}
                            onClick={handleHireFreelancerOnMyProject}
                        >
                            {isPending && <Loader />}Contratar
                        </Button>
                    </div>
                </div>
            </DisclosureContent>
        </Disclosure>
    );
}
