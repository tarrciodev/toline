import { AcountHeader } from "@/components/acount-header";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-screen flex-col'>
            <AcountHeader />
            <div className='flex flex-1 justify-center pt-4 px-4'>
                {children}
            </div>
        </div>
    );
}
