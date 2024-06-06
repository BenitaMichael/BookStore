import { Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo-bg removed.png'

const Header = () => {
  return (
    <div>
      <Navbar className='px-5 py-4 border-b-2'>
        <Link to="/">
            <img src={logo} className='self-center max-w-xs class bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 logo'/>
        </Link>
        <form>
          <TextInput/>
        </form>
      </Navbar>
    </div>
  )
}

export default Header
