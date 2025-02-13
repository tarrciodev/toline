"use client";
import { ShowCaseProps } from "@/actions/users/get-entity";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";

export function ShowCase({ showCase }: { showCase: ShowCaseProps }) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex flex-col border border-gary-200 shadow-lg'>
                    <Image
                        src={showCase.cover}
                        alt='cover'
                        width={200}
                        height={200}
                        className='h-40 object-cover'
                    />
                    <div className='p-4 font-semibold text-gray-700'>
                        {showCase.title}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{showCase.title}</DialogTitle>
                </DialogHeader>
                <div className='w-full border border-gray-100' />
                <ScrollArea className='h-[80dvh] overflow-y-auto flex flex-col gap-2'>
                    {showCase.assets.map((asset) => (
                        <div key={asset.id}>
                            <Image
                                src={asset.link}
                                alt='asset'
                                width={400}
                                height={400}
                                className='object-cover border border-gray-100 shadow-xl'
                            />
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
