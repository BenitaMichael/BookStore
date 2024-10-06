import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import Oauth from '../Components/Oauth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-auto mt-20 mb-20'>
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to='/'
            className='w-12 m-2 flex items-center rounded-lg text-4xl font-bold py-2'
          >
            <h1 className='py-1 text-[#FE5448] dark:text-[#FE5448] whitespace-nowrap'>
              Dark-Light
            </h1>
          </Link>
          <p className='text-black dark:text-gray-200 font-semibold text-center md:text-left'>
            Home to wonders and adventures. A world different from what you know awaits you...
            <br /> Please sign in with your email and password.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label className='dark:text-gray-300' value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                className='bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
              />
            </div>
            <div>
              <Label className='dark:text-gray-300' value='Your password' />
              <TextInput
                type='password'
                placeholder='*********'
                id='password'
                onChange={handleChange}
                className='bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
              />
            </div>
            <Button
              className='bg-[#A500E0] hover:!bg-[#A500E0] dark:bg-[#A500E0] dark:hover:!bg-[#A500E0] text-white border-none'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <Oauth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className='text-black dark:text-gray-300'>Don't have an account?</span>
            <Link to='/signUp' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
