import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoryCard from '../Components/StoryCard';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto bg-[#FAFFEB]'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to DarkLight</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of stories written by an ever evolving and creative mind.
          An unexplored world awaits you.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-[#FE5448] font-bold hover:underline'
        >
          View all stories
        </Link>
      </div>

      {loading && <p className="text-center text-[#FE5448]">Loading stories...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && stories.length > 0 && (
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Stories</h2>
            <div className='flex flex-wrap gap-4'>
              {stories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-[#FE5448] hover:underline text-center'
            >
              View all stories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
