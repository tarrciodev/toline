import { OrbitingUsers } from "./orbiting-circle";
import TypingAnimation from "./ui/typing-animation";

export function Hero() {
    return (
        <section className='bg-blue-50  py-8 sm:py-20  flex px-4 sm:px-56'>
            <div>
                <TypingAnimation
                    className='text-2xl sm:text-4xl font-extrabold text-blue-700 sm:max-w-[40vw] text-left'
                    text=' A TOLINE É A Sua Plataforma, Para Encontrar Projetos, E Profissionais A Distancia De Um Click'
                />

                <div className='mt-4 text-4xl'>
                    <p></p>
                    <p></p>
                </div>
                <div className='my-3 text-2xl sm:max-w-[40vw] font-light text-black/80'>
                    <p>
                        Desenvolva o seu negócio de forma rápida e sustentável.
                        Ligamo-lo a milhares de profissionais com perfil
                        excelente para desenvolver o seu projeto.
                    </p>
                </div>
            </div>
            <OrbitingUsers />
        </section>
    );
}
