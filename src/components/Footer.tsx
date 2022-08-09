import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <>
      <footer className='h-70 py-10 mt-20 text-white bg-black lg:mt-40 lg:py-20'>
        <div className='mx-auto container'>
          <div className='flex flex-wrap justify-between'>
            <div className='flex flex-col lg:w-4/6 '>
              <h4 className='mb-4 text-sm font-semibold tracking-wider uppercase text-purple-300'>
                Quick Links
              </h4>
              <nav>
                <Link
                  href='/'
                  title='Link to About page'
                  className='block mb-1 text-white'>
                  <h3 className='anchor-link'>About</h3>
                </Link>
                <Link
                  href='/profile/'
                  title='Link to Profile page'
                  className='block mb-1 text-white'>
                  <h3 className='anchor-link'>Profile</h3>
                </Link>
                <Link
                  href='/'
                  title='Link to Home page'
                  className='block mb-1 text-white'>
                  <h3 className='anchor-link'>Shelves</h3>
                </Link>
                <Link
                  href='/search/'
                  title='Link to Serach page'
                  className='block mb-1 text-white'>
                  <h3 className='anchor-link'>Search</h3>
                </Link>
                <Link
                  href='/collection/'
                  title='Link to Collection page'
                  className='block mb-1 text-white'>
                  <h3 className='anchor-link'>Collection</h3>
                </Link>
              </nav>
            </div>
            <div className='hidden lg:block lg:w-3/12 xl:w-1/6'>
              <div className='mb-8'>
                <h4 className='mb-2 text-sm font-semibold tracking-wider uppercase text-purple-300 lg:mb-4'>
                  BOOKMARK ME
                </h4>
                <a
                  href='https://www.rhysad.com/'
                  className='text-white big-email anchor-link'>
                  <h3>My Site</h3>
                </a>
                <Link
                  href='/roadmap/'
                  title='Link to Roadmap page'
                  className='block mb-1 text-white'>
                  <h3 className='anchor-link'>Roadmap</h3>
                </Link>
              </div>
              <p className='mt-auto text-sm text-off-white'>© Rhys AD</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
