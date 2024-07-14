import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import { Avatar, Button, Dropdown, DropdownHeader, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const location = useLocation();
  const path = location.pathname;
  const { currentUser } = useSelector(state => state.user)
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMenuOpen) {
      setMenuHeight(document.getElementById('mobile-menu').scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <Navbar className="m-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center flex-grow">
            <Link
              to='/'
              className='m-2 flex items-center bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 rounded-lg text-sm sm:text-xl font-semibold dark:text-white p-2'
            >
              <img src={logo} alt="Logo" className='h-8 w-8' />
              <span className='px-2 py-1 text-white whitespace-nowrap'>
                Dark-Light
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end flex-grow lg:flex lg:gap-4 lg:justify-between">
            <div className="hidden lg:flex items-center gap-8 text-md">
              <Link
                to='/'
                className={`text-gray-700 font-semibold hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/' ? 'text-green-500' : ''}`}
              >
                Home
              </Link>
              <Link
                to='/about'
                className={`text-gray-700 font-semibold hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/about' ? 'text-green-500' : ''}`}
              >
                About
              </Link>
              <Link
                to='/projects'
                className={`text-gray-700 font-semibold hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/projects' ? 'text-green-500' : ''}`}
              >
                Projects
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <form className="hidden md:flex items-center gap-2">
                <TextInput
                  type='text'
                  placeholder='Search...'
                  rightIcon={AiOutlineSearch}
                  className='border-none focus:ring-0'
                />
              </form>
              <Button
                className='w-12 h-10 flex items-center justify-center'
                color='gray'
                pill
                onClick={() => dispatch(toggleTheme())}
              >
                 {theme === 'light' ? <FaSun /> : <FaMoon />}
              </Button>
              {currentUser ? (
                <Dropdown
                    arrowIcon={false}
                    inline
                    label = {
                      <Avatar 
                        alt='user'
                        img = {currentUser.profilePicture}
                        rounded
                      />
                    }
                  >
                    <DropdownHeader>
                      <span className='block text-sm'>@{currentUser.username}</span>
                      <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                    </DropdownHeader>
                      <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                      <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              ):
                (
                  <Link to='/sign-in' className="hidden lg:block">
                    <Button gradientDuoTone='purpleToBlue' outline>
                      Sign In
                    </Button>
                  </Link>
                )
              }
              
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-0"
                gradientDuoTone='purpleToBlue' outline
              >
                <AiOutlineMenu className="w-6 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Navbar>

      <div
        id="mobile-menu"
        className={`lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 absolute w-full left-0 top-full transition-all duration-300 ease-in-out overflow-hidden`}
        style={{ height: menuHeight }}
      >
        <Link to='/' className={`block px-4 py-2 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/' ? 'text-green-500' : ''}`}>
          Home
        </Link>
        <Link to='/about' className={`block px-4 py-2 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/about' ? 'text-green-500' : ''}`}>
          About
        </Link>
        <Link to='/projects' className={`block px-4 py-2 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/projects' ? 'text-green-500' : ''}`}>
          Projects
        </Link>
        <Link to='/sign-in' className="block px-4 py-2">
          <Button className="bg-blue-500 w-full text-white">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
