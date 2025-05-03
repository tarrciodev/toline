import { BorderTrail } from "./ui/border-trail";

export function WhyUs() {
    return (
        <section className='py-14 bg-blue-50 shadow'>
            <div className='max-w-6xl mx-auto px-4'>
                <h3 className='text-3xl font-bold text-center text-gray-800'>
                    Seus Benefícios no Trabalho Remoto
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                    <div className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative'>
                        <h4 className='text-2xl font-semibold text-indigo-700'>
                            Para Profissionais:
                        </h4>
                        <p className='text-gray-700 mt-3 text-lg'>
                            <span className='font-semibold'>
                                Flexibilidade e Autonomia:
                            </span>{" "}
                            A Toline permite que os profissionais trabalhem de
                            qualquer lugar, com horários flexíveis, o que
                            facilita o equilíbrio entre vida pessoal e
                            profissional.
                        </p>
                    </div>
                    <div className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative'>
                        <h4 className='text-2xl font-semibold text-indigo-700'>
                            Para Empresas
                        </h4>
                        <p className='text-gray-700 mt-3 text-lg'>
                            <span className='font-semibold'>
                                Redução de Custos Operacionais:
                            </span>{" "}
                            Economia com aluguel de escritórios, infraestrutura
                            e outros custos relacionados ao espaço físico de
                            trabalho.
                        </p>
                        <BorderTrail
                            className='bg-gradient-to-r from-red-400 via-red-500 to-indigo-400'
                            size={120}
                        />
                    </div>
                    <div className='p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative'>
                        <h4 className='text-2xl font-semibold text-indigo-700'>
                            Sistema de Pagamentos
                        </h4>
                        <p className='text-gray-700 mt-3 text-lg'>
                            <span className='font-semibold'>
                                Pagamentos Seguros:
                            </span>{" "}
                            A Toline utiliza sistemas de pagamento online
                            seguros, como transferências bancárias e carteiras
                            digitais, para garantir transações confiáveis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
