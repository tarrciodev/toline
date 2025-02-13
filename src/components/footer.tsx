import React from 'react'

export  function Footer() {
  return (
      <footer className='bg-gray-800 text-white py-8'>
          <div className='max-w-6xl mx-auto px-4 flex justify-between items-center'>
              <p>&copy; 2024 FreelancerHub. All rights reserved.</p>
              <ul className='flex space-x-6'>
                  <li>
                      <a href='#' className='hover:text-blue-400'>
                          Privacy Policy
                      </a>
                  </li>
                  <li>
                      <a href='#' className='hover:text-blue-400'>
                          Terms of Service
                      </a>
                  </li>
              </ul>
          </div>
      </footer>
  );
}
