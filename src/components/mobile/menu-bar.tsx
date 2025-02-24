import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MenuBar() {
    return (
        <div className='flex sm:hidden'>
            <Drawer>
                <DrawerTrigger asChild>
                    <span>
                        <Menu />
                    </span>
                </DrawerTrigger>
                <DrawerContent className='px-8 pb-10'>
                    <DrawerHeader>
                        <DrawerTitle>Registe-se ou faça login</DrawerTitle>
                    </DrawerHeader>
                    <div className='flex flex-col gap-2'>
                        <Link
                            href='/login'
                            className='bg-black text-white px-4 py-2 rounded-lg hover:black/80 flex justify-center items-center'
                        >
                            Sign in
                        </Link>
                        <Link
                            href='/register'
                            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center'
                        >
                            Sign up
                        </Link>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
