import { getCurrentYear } from "@/utils/get-current-year";
import { facebook, instagram, whatsap, youtube } from "@/utils/links";
import Link from "next/link";
import { FacebookIcon } from "./svg-icons/facebook";
import { InstagramIcon } from "./svg-icons/instagram";
import { Whatsapp } from "./svg-icons/whatsapp";
import { YoutubeIcon } from "./svg-icons/youtube";

export function Footer() {
    return (
        <footer className='bg-gray-50 text-gray-900 py-8'>
            <div className='max-w-6xl mx-auto px-4 flex flex-col items-center gap-4'>
                <p>
                    &copy; {getCurrentYear()} Tooline. Todos os direitos
                    reservados.
                </p>
                <ul className='flex space-x-6'>
                    <Link href='/privacy-policy'>Política de Privacidade</Link>
                    <Link href='terms-of-use'>Termos de Serviço</Link>
                </ul>
                <h2 className='text-lg font-semibold'>Siga-nos</h2>
                <div className='flex gap-6'>
                    <Link href={facebook}>
                        <FacebookIcon />
                    </Link>
                    <Link href={instagram}>
                        <InstagramIcon />
                    </Link>
                    <Link href={youtube}>
                        <YoutubeIcon />
                    </Link>
                    <Link href={whatsap}>
                        <Whatsapp />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
