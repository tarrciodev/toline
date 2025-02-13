import Link from "next/link";
import Chat from "./dash/chat";
import NotificationsLink from "./dash/notifications-link";
import { Logo } from "./logo";

export function DashHeader() {
    return (
        <header className='bg-white shadow sticky top-0 z-50 px-56 overflow-hidden h-16 flex items-center'>
            <div className='py-4 flex flex-1 justify-between items-center'>
                <Logo redirectTo='/dash' />
                <nav>
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
                                href='#contact'
                                className='text-gray-700 hover:text-blue-600'
                            >
                                Blog
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-3'>
                        <Chat />
                        <NotificationsLink />
                    </div>
                </div>
            </div>
        </header>
    );
}
