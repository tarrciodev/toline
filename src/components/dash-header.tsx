import Link from "next/link";
import Chat from "./dash/chat";
import { UserHeaderIcon } from "./dash/header/user-header-icon";
import NotificationsLink from "./dash/notifications-link";
import { Logo } from "./logo";
import { ChatMobile } from "./mobile/cha-mobile";
import { MenuBarDash } from "./mobile/dash/menu-bar-dash";

export interface IDashUser {
    avatarUrl?: string;
    type: string;
    username: string;
}

export function DashHeader({ user }: { user: IDashUser }) {
    return (
        <header className='bg-white shadow-sm sticky top-0 z-50 px-4 sm:px-56 overflow-hidden h-16 flex items-center'>
            <div className='py-4 flex flex-1 justify-between items-center'>
                <Logo redirectTo='/dash' />
                <nav className='hidden sm:flex'>
                    <ul className='flex space-x-6'>
                        <li>
                            <Link
                                href='/dash/projects'
                                className='text-gray-700 hover:text-blue-600'
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dash/freelancers'
                                className='text-gray-700 hover:text-blue-600'
                            >
                                Freelancers
                            </Link>
                        </li>
                        <li>
                            <a
                                href='/blog'
                                className='text-gray-700 hover:text-blue-600'
                            >
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className='flex gap-10 items-center'>
                    <div className='flex gap-3'>
                        <Chat />
                        <ChatMobile />
                        <NotificationsLink />
                    </div>
                    <div className='hidden sm:flex'>
                        <UserHeaderIcon user={user} />
                    </div>
                </div>
                <MenuBarDash />
            </div>
        </header>
    );
}
