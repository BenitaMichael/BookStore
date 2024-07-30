import React from 'react'
import { FileInput, Select, TextInput, Button } from 'flowbite-react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateStory = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Story Time...</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
                <Select>
                <option value='uncategorized'>Select a category</option>
                <option value='Romance'>Romance</option>
                <option value='mystery'>Mystery</option>
                <option value='family'>Family</option>
                <option value='horror'>Horror</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file'accept='image/*' />
                <Button
                    type='button'
                    className='bg-[#A500E0] hover:!bg-[#A500E0]'
                    size='sm'
                >
                    Upload Image
                </Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12' required/>
            <Button type='submit' className='bg-[#A500E0] hover:!bg-[#A500E0] w-36 mx-auto my-2'>Publish</Button>
        </form>
    </div>
  )
}

export default CreateStory
