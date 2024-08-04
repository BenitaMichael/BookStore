import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardStories = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userStories, setUserStories] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(userStories)

  useEffect(() =>{
    const fetchStories = async () =>{
      try {
        const res = await fetch(`/api/story/getstories?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok){
          setUserStories(data.stories)
          if (data.stories.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if( currentUser.isAdmin ){
      fetchStories();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userStories.length;
    try {
      const res = await fetch(
        `/api/story/getstories?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserStories((prev) => [...prev, ...data.stories]);
        if (data.stories.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userStories.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Front Cover</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Author</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell><span>Edit</span></TableHeadCell>
            </TableHead>
            {userStories.map((story) =>(
              <TableBody className='divide-y'>
              <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <TableCell>
                  {new Date(story.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link to={`/story/${story.slug}`}>
                    <img 
                      src={story.image}
                      alt={story.title}
                      className='w-20 h-10 bg-gray-500'
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/story/${story.slug}`}
                    className='font-medium text-gray-900 dark:text-white'
                    >
                      {story.title}
                  </Link>
                </TableCell>

                <TableCell>
                  {story.author}
                </TableCell>

                <TableCell>
                  {story.category}
                </TableCell>

                <TableCell>
                  <span className='text-red-500 font-medium hover:underline cursor-pointer'>Delete</span>
                </TableCell>

                <TableCell>
                  <Link to={`/update-story/${story._id}`} className='text-teal-500 font-medium hover:underline'>
                    <span>Edit</span>
                  </Link>
                </TableCell>

                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ):(
      <h2 className='text-center mt-7 font-semibold text-3xl font-medium'>You have uploaded 0 stories</h2>
    )}
    </div>
  )
}

export default DashboardStories
