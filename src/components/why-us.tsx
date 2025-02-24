import React from 'react'
import { BorderBeam } from './ui/border-beam';

export function WhyUs() {
  return (
      <section id='features' className='py-20'>
          <div className='max-w-6xl mx-auto px-4'>
              <h3 className='text-3xl font-bold text-center text-gray-800'>
                  Porque Nos Escolher?
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                  <div className='p-6 bg-white rounded shadow-sm'>
                      <h4 className='text-3xl text-blue-600'>
                          Vasta reserva de talentos
                      </h4>
                      <p className='text-gray-600 mt-2 text-xl font-light'>
                          Aceda a milhares de profissionais qualificados em
                          vários domínios.
                      </p>
                  </div>
                  <div className='p-6 bg-white rounded shadow-sm relative'>
                      <h4 className='text-3xl  text-blue-600'>
                          Fácil de utilizar
                      </h4>
                      <p className='text-gray-600 mt-2 text-xl font-light'>
                          Publique os seus projectos e receba propostas em
                          minutos.
                      </p>
                      <BorderBeam />
                  </div>
                  <div className='p-6 bg-white rounded shadow-sm'>
                      <h4 className='text-3xl text-blue-600'>
                          Pagamentos seguros
                      </h4>
                      <p className='text-gray-600 mt-2 text-xl font-light'>
                          Pague apenas quando estiver satisfeito com o trabalho
                          entregue.
                      </p>
                  </div>
              </div>
          </div>
      </section>
  );
}
