import Image from "next/image";
import dontcare from "../assets/dontcare.jpg";
import fashion from "../assets/fashion.jpg";
import female from "../assets/female.jpg";
import lafemme from "../assets/lafemme.jpg";
import male from "../assets/male.jpg";
import nerd from "../assets/nerd.jpg";
import old from "../assets/old-men.jpg";
import { OrbitingCircles } from "./magicui/orbiting-circles";

export function OrbitingUsers() {
    return (
        <div className='hidden relative sm:flex h-[350px] sm:w-[30dvw] flex-col items-center justify-center  rounded-lg'>
            <OrbitingCircles iconSize={60}>
                <Image
                    src='https://cf.workana.com/logos/6e9ebb5a014a0ae7dc5dfb367db472f9/xe/Felizdiados_192_192.png'
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={female.src}
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={lafemme.src}
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={old.src}
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={nerd.src}
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                <Image
                    src='https://github.com/tarcisioteixeira.png'
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={dontcare.src}
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={fashion.src}
                    alt='Notion'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={male.src}
                    alt='Rosto Gerado'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
            </OrbitingCircles>
        </div>
    );
}
