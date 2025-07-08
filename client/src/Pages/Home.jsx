import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoryCard from '../Components/StoryCard';
import bookImage from '../assets/Books/etheral.png';
import bookImage1 from '../assets/Books/flowerhand-sepia.png';
import bookImage2 from '../assets/Books/wolf.png';
import bookImage3 from '../assets/Books/flowerhand-1.png';
import bookImage4 from '../assets/Books/WaterDrop.png';

import { motion, AnimatePresence } from 'framer-motion';

const bookImages = [bookImage, bookImage1, bookImage2, bookImage3, bookImage4];

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);

  const fetchStories = async () => {
    try {
      const res = await fetch('/api/story/getStories');
      const data = await res.json();
      setStories(data.stories);
    } catch (err) {
      setError('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bookImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center gap-6 p-28 px-3 max-w-6xl mx-auto bg-[#FAFFEB] dark:bg-gray-900 dark:text-white">
      {/* Text content */}
<div className="flex-1 space-y-6">
  <h1 className="text-3xl font-bold lg:text-6xl">
    Welcome to <span className="text-[#FE5448]">DarkLight</span>
  </h1>

  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
    Discover powerful narratives and immersive tales crafted with creativity and depth.
    Whether you're here to read, explore, or write — your journey starts now.
  </p>

  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
    Join a growing community of readers and writers bringing worlds to life through stories.
  </p>

  <div className="flex gap-4 flex-wrap">
    <Link
      to="/signup"
      className="bg-[#FE5448] text-white px-5 py-2 rounded-md text-sm font-semibold shadow hover:bg-[#e3443a] transition"
    >
      Get Started
    </Link>

    <Link
      to="/signin"
      className="border border-[#FE5448] text-[#FE5448] px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#fff1f0] dark:hover:bg-gray-800 transition"
    >
      Sign In
    </Link>

    
  </div>
  <div className='mt-3'>
     <Link
      to="/search"
      className="my-4 text-sm text-[#FE5448] font-bold hover:underline self-center"
    >
      Browse Stories
    </Link>
  </div>
 
</div>

      {/* Animated stacked books */}
      <div className="flex-1 hidden lg:flex flex-col gap-4 items-center relative h-[400px] w-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          {bookImages.map((img, index) =>
            index === current ? (
              <motion.img
                key={index}
                src={img}
                alt={`Book ${index + 1}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-60 h-auto object-cover rounded-lg shadow-lg absolute"
              />
            ) : null
          )}
        </AnimatePresence>
      </div>
    </section>

      {/* Stories Section */}
      {loading && <p className="text-center text-[#FE5448]">Loading stories...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && stories.length > 0 && (
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Stories</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-[#FE5448] hover:underline text-center"
            >
              View all stories
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
