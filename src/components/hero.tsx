import { OrbitingUsers } from "./orbiting-circle";
import TypingAnimation from "./ui/typing-animation";

export function Hero() {
    return (
        <section className='bg-blue-50 py-20  flex px-56'>
            <div>
                <TypingAnimation
                    className='text-4xl font-extrabold text-blue-700 max-w-[40vw] text-left'
                    text=' A TOLINE É A Sua Plataforma, Para Encontrar Projetos, E Profissionais A Distancia De Um Click'
                />

                <div className='mt-4 text-4xl'>
                    <p></p>
                    <p></p>
                </div>
                <div className='my-3 text-2xl max-w-[40vw] font-light text-black/80'>
                    <p>
                        Desenvolva o seu negócio de forma rápida e sustentável.
                        Ligamo-lo a milhares de profissionais com perfil
                        excelente para desenvolver o seu projeto.
                    </p>
                </div>
                <div className='mt-6 '>
                    <a
                        href='/register'
                        className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700'
                    >
                        Get Started
                    </a>
                </div>
            </div>
            <OrbitingUsers />
        </section>
    );
}
