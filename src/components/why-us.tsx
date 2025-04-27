import { BorderTrail } from "./ui/border-trail";

export function WhyUs() {
    return (
        <section className='py-14 bg-blue-50 shadow'>
            <div className='max-w-6xl mx-auto px-4'>
                <h3 className='text-3xl font-bold text-center text-gray-800'>
                    Porque Nos Escolher?
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                    <div className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative'>
                        <h4 className='text-2xl font-semibold text-indigo-700'>
                            Vasta reserva de talentos
                        </h4>
                        <p className='text-gray-700 mt-3 text-lg'>
                            Aceda a milhares de profissionais qualificados em
                            vários domínios.
                        </p>
                    </div>
                    <div className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative'>
                        <h4 className='text-2xl font-semibold text-indigo-700'>
                            Fácil de utilizar
                        </h4>
                        <p className='text-gray-700 mt-3 text-lg'>
                            Publique os seus projectos e receba propostas em
                            minutos.
                        </p>
                        <BorderTrail
                            className='bg-gradient-to-r from-red-400 via-red-500 to-indigo-400'
                            size={120}
                        />
                    </div>
                    <div className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative'>
                        <h4 className='text-2xl font-semibold text-indigo-700'>
                            Pagamentos seguros
                        </h4>
                        <p className='text-gray-700 mt-3 text-lg'>
                            Pague apenas quando estiver satisfeito com o
                            trabalho entregue.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
