import Image from "next/image";
import creative from "../assets/creative.jpg";
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
                    src={creative.src}
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={female.src}
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={lafemme.src}
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={old.src}
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={nerd.src}
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                <Image
                    src='https://github.com/tarcisioteixeira.png'
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={dontcare.src}
                    alt='freelancer na toline'
                    className='w-full h-full object-cover rounded-full'
                    width={100}
                    height={100}
                />
                <Image
                    src={fashion.src}
                    alt='freelancer na toline'
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
