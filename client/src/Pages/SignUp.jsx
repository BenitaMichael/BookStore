import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png';


const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-3xl mx-auto">
        {/* left */}
        <div className="">
        <Link
              to='/'
              className='w-12 m-2 flex items-center bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 rounded-lg text-4xl font-bold p-2'
            >
              <img src={logo} alt="Logo" className='h-10 w-10' />
              <span className='px-2 py-1 text-black whitespace-nowrap'>
                Dark-Light
              </span>
            </Link>
            <p className='text-black font-semibold'>Home to wonders and adventures</p>
          </div>

        {/* right */}
        <div className=""></div>
      </div>
    </div>
  )
}

export default SignUp