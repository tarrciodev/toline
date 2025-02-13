"use client";
import { Plus } from "lucide-react";

export function AddCertification() {
    function handleUploadCertification(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
    }
    return (
        <div className='relative border border-gray-400 p-4 rounded flex items-center justify-center  cursor-pointer'>
            <input
                type='file'
                className='absolute opacity-0 z-10 w-full h-full cursor-pointer'
                onChange={handleUploadCertification}
            />
            <Plus className='text-9xl' size={20} />
            <span className='flex items-center justify-center text-sm'>
                Adicionar
            </span>
        </div>
    );
}
