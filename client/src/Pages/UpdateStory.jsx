import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateStory() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [newChapter, setNewChapter] = useState({ title: '', content: '' });
  
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const { storyId } = useParams();

useEffect(() => {
  const fetchStory = async () => {
    console.log(storyId)
    try {
      const res = await fetch(`/api/story/getstories?storyId=${storyId}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        setFormData(data.stories[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchStory();
}, [storyId]); // Make sure to include storyId in the dependency array


  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleChapterChange = (index, field, value) => {
    const updatedChapters = formData.chapters.map((chapter, i) =>
      i === index ? { ...chapter, [field]: value } : chapter
    );
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const handleAddChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: '', content: '' }],
    });
  };


  const handleDeleteChapter = (index) => {
    const chapterToDelete = formData.chapters[index];
    
    // Store the chapter id to be removed in a separate state variable
    setFormData({
      ...formData,
      chapters: formData.chapters.filter((_, i) => i !== index),
      removeChapterIds: [
        ...(formData.removeChapterIds || []),
        chapterToDelete._id,
      ],
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/story/updatestory/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/stories/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-5 font-semibold'>Update a story...</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <TextInput
            type="text"
            placeholder="Author"
            required
            id="author"
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            value={formData.author}
          />
          
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
              <option value='Uncategorized'>Select a category</option>
              <option value='Romance'>Romance</option>
              <option value='Mystery'>Mystery</option>
              <option value='Family'>Family</option>
              <option value='Horror'>Horror</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            className='bg-[#A500E0] hover:!bg-[#A500E0]'
            size='sm'
            onClick={handleImageUpload}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        {formData.chapters && formData.chapters.map((chapter, index) => (
          <div key={index} className='flex flex-col gap-2 mb-4'>
            <TextInput
              type='text'
              placeholder='Chapter Title'
              value={chapter.title}
              onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
            />
            <ReactQuill
              theme='snow'
              value={chapter.content}
              placeholder='Chapter Content'
              onChange={(value) => handleChapterChange(index, 'content', value)}
              className='h-40 mb-2'
            />
            <Button
              type='button'
              color='failure'
              onClick={() => handleDeleteChapter(index)}
            >
              Delete Chapter
            </Button>
          </div>
        ))}
        <Button
          type='button'
          className='bg-[#A500E0] hover:!bg-[#A500E0] w-36 mx-auto my-2'
          onClick={handleAddChapter}
        >
          Add Chapter
        </Button>

        <div className='flex flex-col gap-2 mb-4'>
          <h2 className='text-xl font-semibold'>Epilogue</h2>
          <ReactQuill
            theme='snow'
            value={formData.epilogue}
            placeholder='Write the epilogue...'
            onChange={(value) => setFormData({ ...formData, epilogue: value })}
            className='h-40 mb-2'
          />
        </div>

        <Button type='submit' className='bg-[#A500E0] hover:!bg-[#A500E0] w-36 mx-auto my-2'>
          Update
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
