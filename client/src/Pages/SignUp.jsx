import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png';
import { Button, Label, TextInput } from 'flowbite-react';


const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link
              to='/'
              className='w-12 m-2 flex items-center bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 rounded-lg text-4xl font-bold p-2'
            >
              <img src={logo} alt="Logo" className='h-10 w-10' />
              <span className='px-2 py-1 text-black whitespace-nowrap'>
                Dark-Light
              </span>
            </Link>
            <p className='text-black font-semibold text-center md:text-left'>Home to wonders and adventures. A world different from what you know awaits you...</p>
          </div>

        {/* right */}
        <div className="flex-1">
          <form action="" className='flex flex-col gap-4'>
            <div>
              <Label value='Enter Your Username' />
              <TextInput type= 'text' placeholder='Username' id='username' />
            </div>
            <div>
              <Label value='Enter Your Email' />
              <TextInput type= 'text' placeholder='Email' id='email' />
            </div>
            <div>
              <Label value='Enter Your Password' />
              <TextInput type= 'text' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>
              Sign Up
            </Button>
          </form>

          <div className="flex gap-3 text-sm mt-5">
            <span>Have an account??</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp