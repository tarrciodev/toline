import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PoliciesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='bg-gray-50  overflow-y-auto flex flex-col min-h-screen'>
            <Header />
            <div className='bg-gray-100 px-4 sm:px-56 py-6 flex flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    );
}
