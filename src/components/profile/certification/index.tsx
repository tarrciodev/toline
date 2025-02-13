"use client";
import { Files, Plus } from "lucide-react";
import Link from "next/link";
import { AddCertificationModal } from "./add-certification-modal";

interface ICertification {
    id: string;
    certificationName: string;
    link: string;
}

export function Certification({
    certifications,
    publicProfile,
}: {
    certifications?: ICertification[];
    publicProfile?: boolean;
}) {
    const hasCertifications = certifications && certifications?.length > 0;
    return (
        <div className='bg-white flex p-4 rounded shadow-xl'>
            <div className='flex flex-col flex-1'>
                <span className='font-semibold text-lg'>
                    Certificações: {certifications?.length ?? 0}
                </span>
                <div className='flex gap-1'>
                    {hasCertifications && (
                        <div className='flex gap-1 w-full'>
                            {certifications.map((certification) => (
                                <Link
                                    key={certification.id}
                                    href={certification.link}
                                    className='relative border border-gray-300 p-4 bg-gray-100 rounded flex items-center justify-center size-28 cursor-pointer shadow-lg'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <p className='text-center'>
                                        {certification.certificationName}
                                    </p>
                                    <span className='absolute bottom-0 right-0 flex items-center justify-center text-red-700'>
                                        <Files />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                    {publicProfile || (
                        <AddCertificationModal>
                            <div className='border border-gray-300 bg-gray-100 p-4 rounded flex items-center justify-center size-28 cursor-pointer'>
                                <Plus className='text-9xl' size={20} />
                                <span className='flex items-center justify-center text-sm'>
                                    Adicionar
                                </span>
                            </div>
                        </AddCertificationModal>
                    )}
                </div>
            </div>
        </div>
    );
}
