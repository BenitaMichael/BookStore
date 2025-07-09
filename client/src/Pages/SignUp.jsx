import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Oauth from '../Components/Oauth';
import PageLoader from '../Components/PageLoader';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  },[]);

  if (pageLoading) return <PageLoader />;

  return (
    <div className="min-h-[800] bg-gradient-to-br from-[#FAFFEB] to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10 p-8 md:p-12">
        {/* Left: Welcome */}
        <div className="space-y-5">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-3xl font-bold text-[#A500E0]">Dark-Light</span>
          </Link>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            Begin your adventure<br />
            Create an account and start writing or reading stories that shape worlds.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link to="/sign-in" className="text-[#FE5448] font-semibold ml-2 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right: Sign Up Form */}
        <div className="space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Username" className="text-sm text-gray-700 dark:text-gray-200" />
              <TextInput
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" className="text-sm text-gray-700 dark:text-gray-200" />
              <TextInput
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
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
                  <span>Signing up...</span>
                </div>
              ) : (
                'Sign Up'
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

export default SignUp;
