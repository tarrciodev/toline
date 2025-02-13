"use client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { UploadImage } from "./upload-image";

export default function UserIdentification() {
    const [BIFront, setBIFront] = useState<File | null>(null);
    const [BIBack, setBIBack] = useState<File | null>(null);
    console.log({ BIFront, BIBack });
    return (
        <div className='bg-white flex p-4 rounded shadow-xl flex-col'>
            <div className='flex w-full justify-between'>
                <div className='flex flex-col flex-1'>
                    <span className='font-semibold text-lg'>Identificação</span>
                </div>
                <span className='cursor-pointer'>
                    <Pencil />
                </span>
            </div>
            <div className='flex gap-5'>
                <UploadImage setState={setBIFront} type='BIFront' />
                <UploadImage setState={setBIBack} type='BIBack' />
            </div>
        </div>
    );
}
