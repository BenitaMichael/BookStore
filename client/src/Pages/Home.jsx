import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoryCard from '../Components/StoryCard';
import bookImage from '../assets/bookImage.png';
import { motion, AnimatePresence } from 'framer-motion';

const bookImages = [bookImage, bookImage, bookImage, bookImage, bookImage];

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
      <div className="flex-1">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to DarkLight</h1>
        <p className="text-gray-500 text-xs sm:text-sm py-8">
          Here you'll find a variety of stories written by an ever evolving and creative mind.
          An unexplored world awaits you.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-[#FE5448] font-bold hover:underline"
        >
          View all stories
        </Link>
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
                className="w-40 h-auto object-cover rounded-lg shadow-lg absolute"
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
