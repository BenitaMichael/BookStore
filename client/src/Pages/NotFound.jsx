import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineDarkMode } from 'react-icons/md';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4
      bg-[#FAFFEB] text-gray-800
      dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-white transition-colors duration-500"
    >
      <div className="text-7xl mb-6 animate-pulse">404</div>

      <div className="flex items-center text-xl mb-4">
        <FaRegLightbulb className="text-yellow-500 dark:text-yellow-400 mr-2 animate-flicker" />
        <p className="italic">
          Oops... looks like the lights are out on this page.
        </p>
      </div>

      <p className="mb-6 text-gray-600 dark:text-gray-400 max-w-md">
        You've wandered into the shadows. This page doesn't exist, or maybe it's just hiding from the light...
      </p>

      <Link to="/">
        <button
          className="flex items-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-300
            bg-gradient-to-r from-[#A500E0] to-[#FE5448] hover:from-[#8f00c8] hover:to-[#e03c38]
            dark:from-purple-800 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-500"
        >
          <FaArrowLeft />
          Back to the light
        </button>
      </Link>

      <div className="mt-10 opacity-70">
        <MdOutlineDarkMode className="text-4xl animate-spin-slow" />
      </div>
    </div>
  );
}
