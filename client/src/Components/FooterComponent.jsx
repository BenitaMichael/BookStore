import { Footer, FooterDivider, FooterTitle } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png';

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-[#A500E0]'>
       <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='m-2 md:w-auto flex items-center bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 rounded-lg text-sm sm:text-xl font-semibold dark:text-white p-2'
            >
              <img src={logo} alt="Logo" className='h-8 w-8' />
              <span className='px-2 py-1 text-white whitespace-nowrap'>
                Dark-Light
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm: mt-8">
            <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='#'
                target='_blank'
                rel='noopener norereferer'
              >
                About Precious
              </Footer.Link>
              <Footer.Link
                href='#'
                target='_blank'
                rel='noopener norereferer'
              >
                About DarkLight
              </Footer.Link>
            </Footer.LinkGroup>
            </div>

            <div>
            <Footer.Title title='Socials' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='#'
                target='_blank'
                rel='noopener norereferer'
              >
                X
              </Footer.Link>
              <Footer.Link
                href='#'
                target='_blank'
                rel='noopener norereferer'
              >
                Instagram
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            
          </div>
        </div>

        <FooterDivider/>
        <div>
          <Footer.Copyright href='#'
          by='Built With Love By Bunnie.tech'
          year={new Date().getFullYear()}/>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent

