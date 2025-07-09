import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CommentSection from '../Components/CommentSection';
import StoryCard from '../Components/StoryCard';

const StoryPage = () => {
  const { storySlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [story, setStory] = useState(null);
  const [recentStories, setRecentStories] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/story/getstories?slug=${storySlug}`);

        if (!res.ok) {
          setError(true);
          setLoading(false);
        }
        if (res.ok) {
          const data = await res.json();
          setStory(data.stories[0]);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchStory();
  }, [storySlug]);

  useEffect(() => {
    try {
      const fetchRecentStories = async () => {
        const res = await fetch(`/api/story/getstories?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentStories(data.stories);
        }
      };
      fetchRecentStories();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='p-6 md:p-10 lg:p-16 flex flex-col max-w-6xl mx-auto min-h-screen bg-[#FAFFEB] dark:bg-gray-900 text-gray-800 dark:text-white'>
      <h1 className='text-4xl mt-10 p-3 text-center font-serif font-bold max-w-3xl mx-auto lg:text-5xl'>{story && story.title}</h1>

      <Link
        to={`/search?category=${story && story.category}`}
        className='self-center mt-5 text-bold'
      >
        <Button color='gray' pill size='xs'>{story && story.category}</Button>
      </Link>

      <img
        src={story && story.image}
        alt={story && story.title}
        className='mt-10 max-h-[500px] w-full object-cover rounded-xl shadow-lg border border-gray-200 dark:border-gray-700'
      />

      {/* Prologue */}
      {story?.prologue && (
        <section className='mt-12 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
          <h2 className='text-3xl font-semibold text-center font-serif mb-2'>Prologue</h2>
          <div className='w-12 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full' />
          <div className='text-lg leading-relaxed story-content' dangerouslySetInnerHTML={{ __html: story.prologue }} />
        </section>
      )}

      {/* Chapters */}
      {story?.chapters?.length > 0 && (
        <section className='mt-12 space-y-8'>
          <h2 className='text-3xl font-semibold text-center font-serif'>Chapters</h2>
          <div className='w-12 h-1 bg-black dark:bg-white mx-auto mb-6 rounded-full' />
          {story.chapters.map((chapter, index) => (
            <div key={index} className='px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
              <h3 className='text-xl font-bold text-center mb-2'>
                Chapter {index + 1}: {chapter.title}
              </h3>
              <div className='text-md leading-relaxed story-content' dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </div>
          ))}
        </section>
      )}

      {/* Epilogue */}
      {story?.epilogue && (
        <section className='mt-12 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
          <h2 className='text-3xl font-semibold text-center font-serif mb-2'>Epilogue</h2>
          <div className='w-12 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full' />
          <div className='text-lg leading-relaxed text-center story-content' dangerouslySetInnerHTML={{ __html: story.epilogue }} />
        </section>
      )}

      <div className='mt-12'>
        <CommentSection storyId={story._id} />
      </div>

      {/* Recent Stories */}
      <section className='mt-16 text-center'>
        <h2 className='text-2xl font-bold mb-6'>Recent Stories</h2>
        <div className='flex flex-wrap gap-6 justify-center'>
          {recentStories && recentStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default StoryPage;
