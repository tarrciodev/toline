import Providers from "@/providers";

export default function DashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <div className='bg-gray-50  min-h-screen overflow-y-auto'>
                {children}
            </div>
        </Providers>
    );
}
