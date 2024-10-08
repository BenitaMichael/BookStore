import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
    return (
        <div className='group relative w-full border-2 border-[#A500E0] hover:border-4 h-[360px] overflow-hidden rounded-lg sm:w-[360px] transition-all'>
          <Link to={`/story/${story.slug}`}>
            <img
              src={story.image}
              alt='story cover'
              className='h-[240px] w-full  object-cover group-hover:h-[180px] transition-all duration-300 z-20'
            />
          </Link>
          <div className='p-3 flex flex-col gap-3'>
            <p className='text-lg font-semibold line-clamp-2'>{story.title}</p>
            <span className='italic text-sm'>{story.category}</span>
            <Link
              to={`/story/${story.slug}`}
              className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border-4 border-[#A500E0] text-[#A500E0] hover:bg-[#A500E0] hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 text-xl font-bold'
            >
              Read Story
            </Link>
          </div>
        </div>
      );
}

export default StoryCard
