import { AcountHeader } from "@/components/acount-header";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col h-screen bg-gray-200'>
            <AcountHeader />
            <div className='flex flex-1 justify-center sm:pt-8 '>
                {children}
            </div>
        </div>
    );
}
