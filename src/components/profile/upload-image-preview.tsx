import { CreditCard, IdCard } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface IUploadImageProps {
    setState: (file: File | null) => void;
    type: "BIFront" | "BIBack";
}

export function UploadImagePreview({ setState, type }: IUploadImageProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (!selectedFile) {
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setFile(selectedFile);
        setState(selectedFile); // Pass the selected file to the parent component
    };

    return (
        <div className='w-full sm:w-[20dvw]'>
            {file ? (
                <div>
                    <div className='relative border border-green-400 w-full h-40 overflow-hidden'>
                        <Image
                            src={preview as string}
                            alt='Preview'
                            width={200}
                            height={200}
                            className='object-cover w-full h-full'
                        />
                    </div>
                </div>
            ) : (
                <div className='relative w-full  bg-red-50 h-40'>
                    <input
                        type='file'
                        onChange={handleFileChange}
                        className='opacity-0 absolute w-full h-full z-10'
                    />
                    <div className='flex justify-center items-center flex-col border border-red-100 p-8 rounded h-40'>
                        <span>
                            {type === "BIFront" ? (
                                <IdCard size={52} />
                            ) : (
                                <CreditCard size={52} />
                            )}
                        </span>
                        <span className='text-sm'>selecione</span>
                    </div>
                </div>
            )}
        </div>
    );
}
