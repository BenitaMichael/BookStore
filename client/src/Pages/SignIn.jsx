import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import Oauth from '../Components/Oauth';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import PageLoader from '../Components/PageLoader';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        return dispatch(signInFailure(data.message));
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setPageLoading(false);
    }
    , 2000);

    return () => clearTimeout(delay);
  }, []);

  if (pageLoading) return <PageLoader />;

  return (
    <div className="min-h-[800] bg-gradient-to-br from-[#FAFFEB] to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10 p-8 md:p-12">
        {/* Left: Welcome Text */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-[#A500E0]">Dark-Light</h1>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            Welcome back to the world of wonder<br />
            Sign in to explore stories filled with magic, mystery, and meaning.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <Link to="/signup" className="text-[#FE5448] font-semibold ml-2 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right: Form */}
        <div className="space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Email" className="text-sm text-gray-700 dark:text-gray-200" />
              <TextInput
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                value="Your password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="********"
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white py-2.5 px-4 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#A500E0] to-[#FE5448] hover:from-[#8f00c8] hover:to-[#e03c38] text-white font-semibold py-1 px-4 rounded-xl shadow-lg transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <Oauth />

          {errorMessage && (
            <Alert color="failure" className="mt-4">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
