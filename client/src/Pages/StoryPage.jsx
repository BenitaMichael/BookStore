import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, Spinner } from 'flowbite-react';
import CommentSection from '../Components/CommentSection';
import StoryCard from '../Components/StoryCard'

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
                if (res.ok){
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
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{story && story.title}</h1>
        <Link
            to={`/search?category=${story && story.category}`}
            className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{story && story.category}</Button>
        </Link>
        <img
            src={story && story.image}
            alt={story && story.title}
            className='mt-10 p-3 max-h-[600px] w-full object-cover'
        />

         {/* Prologue */}
         {story?.prologue && (
                <div className="mt-10">
                    <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                        Prologue
                    </h2>
                    <div className="underline underline-offset-4 decoration-3 decoration-black mx-auto w-8 mt-1" />
                    <div
                        className="mt-2 text-center story-content"
                        dangerouslySetInnerHTML={{ __html: story.prologue }}
                    />
                </div>
            )}

            {/* Chapters */}
            {story?.chapters?.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">Chapters</h2>
                    <div className="underline underline-offset-4 decoration-3 decoration-black mx-auto w-8 mt-1" />
                    {story.chapters.map((chapter, index) => (
                        <div key={index} className="mt-5">
                            <h3 className="text-xl font-bold text-center story-chapters">
                                Chapter {index + 1}: {chapter.title}
                            </h3>
                            <div className="underline underline-offset-4 decoration-3 decoration-black mx-auto w-8 mt-1" />
                            <div
                                className="mt-2 story-content"
                                dangerouslySetInnerHTML={{ __html: chapter.content }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Epilogue */}
            {story?.epilogue && (
                <div className="mt-10">
                    <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                        Epilogue
                    </h2>
                    <div className="underline underline-offset-4 decoration-3 decoration-black mx-auto w-8 mt-1" />
                    <div
                        className="mt-2 text-center story-content"
                        dangerouslySetInnerHTML={{ __html: story.epilogue }}
                    />
                </div>
            )}

            <CommentSection storyId={story._id}/>

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent Stories</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                {recentStories &&
                    recentStories.map((story) => <StoryCard key={story._id} story={story} />)}
                </div>
            </div>

    </main>
  )
}

export default StoryPage
