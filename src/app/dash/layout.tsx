import { getUserAsEntity } from "@/actions/users/get-entity";
import { DashHeader } from "@/components/dash-header";
import { Footer } from "@/components/footer";
import { Providers } from "@/providers";

export default async function DashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const entity = await getUserAsEntity();
    const userForHeader = {
        avatarUrl: entity.avatarUrl,
        type: entity.type,
        username: entity.name,
    };
    return (
        <Providers>
            <div className='bg-gray-50  overflow-y-auto flex flex-col min-h-screen'>
                <DashHeader user={userForHeader} />
                <div className='bg-gray-200 px-4 sm:px-56 py-2 sm:py-6 flex flex-1'>
                    {children}
                </div>
                <Footer />
            </div>
        </Providers>
    );
}
