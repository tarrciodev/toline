export function Projects() {
    return (
        <section id='projects' className='bg-gray-100 py-20'>
            <div className='max-w-6xl mx-auto px-4'>
                <h3 className='text-3xl font-bold text-center text-gray-800'>
                    Explore Projectos
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
                    <div className='p-6 bg-white rounded shadow-sm'>
                        <h4 className='text-lg font-semibold text-gray-700'>
                            Desenvolvimento Web
                        </h4>
                        <p className='text-gray-600 mt-2'>
                            Desenvolva Ecommerce e Sites responsivos.
                        </p>
                    </div>
                    <div className='p-6 bg-white rounded shadow-sm'>
                        <h4 className='text-lg font-semibold text-gray-700'>
                            Design Grafico
                        </h4>
                        <p className='text-gray-600 mt-2'>
                            Logotipos, Cards interativos e muito mais
                        </p>
                    </div>
                    <div className='p-6 bg-white rounded shadow-sm'>
                        <h4 className='text-lg font-semibold text-gray-700'>
                            Redação
                        </h4>
                        <p className='text-gray-600 mt-2'>
                            Copyrighting, Redação e Revivão de Conteúdos.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
