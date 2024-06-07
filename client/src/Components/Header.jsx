import { FaMoon } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <Navbar>
      <Link
        to='/'
        className='flex items-center bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 rounded-lg whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white p-2'
      >
        <img src={logo} alt="Logo" className='h-8 w-8' />
        <span className='px-2 py-1 text-white'>
          Dark-Light
        </span>
      </Link>

      <form className='flex flex-1 justify-end hidden sm:flex'>
        <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
          <TextInput 
            type='text'
            placeholder='Search...'
            className='border-none focus:ring-0'
          />
          <button type="submit" className='bg-blue-500 text-white p-2'>
            <AiOutlineSearch className='w-5 h-5' />
          </button>
        </div>
      </form>
      
      <Button
        className='w-12 h-10 flex items-center justify-center'
        color='gray'
        pill
      >
        <FaMoon />
      </Button>
    </Navbar>
  )
}

export default Header;
