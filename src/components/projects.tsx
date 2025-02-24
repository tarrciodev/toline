import React from 'react'

export function Projects() {
  return (
      <section id='projects' className='bg-gray-100 py-20'>
          <div className='max-w-6xl mx-auto px-4'>
              <h3 className='text-3xl font-bold text-center text-gray-800'>
                  Explore Projects
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
                  <div className='p-6 bg-white rounded shadow-sm'>
                      <h4 className='text-lg font-semibold text-gray-700'>
                          Web Development
                      </h4>
                      <p className='text-gray-600 mt-2'>
                          Build a responsive e-commerce website.
                      </p>
                  </div>
                  <div className='p-6 bg-white rounded shadow-sm'>
                      <h4 className='text-lg font-semibold text-gray-700'>
                          Graphic Design
                      </h4>
                      <p className='text-gray-600 mt-2'>
                          Design a modern logo for a startup.
                      </p>
                  </div>
                  <div className='p-6 bg-white rounded shadow-sm'>
                      <h4 className='text-lg font-semibold text-gray-700'>
                          Content Writing
                      </h4>
                      <p className='text-gray-600 mt-2'>
                          Write engaging blog posts for a tech company.
                      </p>
                  </div>
              </div>
          </div>
      </section>
  );
}
