import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import { DashHeader } from "@/components/dash-header";
import { Footer } from "@/components/footer";
import { Providers } from "@/providers";
import { ClientSessionHydrator } from "./(components)/hydratator-session-store";

export default async function DashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const entity = await getTolinerAsEntity();

    const userForHeader = {
        avatarUrl: entity.avatarUrl,
        type: entity.type,
        username: entity.name,
    };

    return (
        <Providers>
            <div className='bg-gray-50  flex flex-col min-h-screen'>
                <ClientSessionHydrator logged_as={entity.type} />
                <DashHeader user={userForHeader} />
                <div className='bg-gray-200  sm:px-56 py-1 flex flex-1'>
                    {children}
                </div>
                <Footer />
            </div>
        </Providers>
    );
}
