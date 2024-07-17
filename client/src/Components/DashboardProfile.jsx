import { Button, Textarea } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'

const DashboardProfile = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover'/>
        </div>
        <Textarea type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <Textarea type='text' id='email' placeholder='emaal' defaultValue={currentUser.email}/>
        <Textarea type='text' id='password' placeholder='password'/>
        <Button type='submit' className='bg-[#A500E0] hover:!bg-[#A500E0] text-white border-none my-2'>Update</Button>
      </form>
      <div className='text-[#FE5448] flex justify-between mt-5'>
        <span className='cursor-pointer'>
          Delete Account
        </span>
        <span className='cursor-pointer'>
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default DashboardProfile
