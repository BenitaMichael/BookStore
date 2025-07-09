import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar, Button, Dropdown, DropdownHeader, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      setMenuHeight(document.getElementById('mobile-menu').scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [isMenuOpen]);

  return (
    <div className="relative sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <Navbar className="m-2 bg-[#FAFFEB] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center flex-grow">
            <Link
              to='/'
              className='m-2 flex items-center bg-[#FE5448] rounded-lg text-sm sm:text-xl font-semibold dark:text-white p-2'
            >
              <img src={logo} alt="Logo" className='h-8 w-8 hidden md:block' />
              <span className='px-2 py-1 text-white whitespace-nowrap'>
                Dark-Light
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end flex-grow lg:flex lg:gap-4 lg:justify-between">
            <div className="hidden lg:flex items-center gap-16 text-md"> 
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
                to='/contact'
                className={`text-gray-700 font-semibold hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/contact' ? 'text-green-500' : ''}`}
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <form onSubmit={handleSubmit}>
                <TextInput
                  type='text'
                  placeholder='Search...'
                  className='hidden lg:inline'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'>
                      {currentUser.email}
                    </span>
                  </Dropdown.Header>
                  <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                </Dropdown>
              ) : (
                <Link to='/sign-in'>
                  <Button className='bg-[#A500E0] hover:!bg-[#A500E0] w-24 text-white border-none text-xs sm:text-base' outline>
                    Sign In
                  </Button>
                </Link>
              )}

              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-0 !bg-white text-black"
              >
                <AiOutlineMenu className="w-5 h-5" />
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
        <Link to='/contact' className={`block px-4 py-2 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white ${path === '/contact' ? 'text-green-500' : ''}`}>
          Contact
        </Link>
      </div>
    </div>
  );
}

export default Header;
