import { Alert, Button, FileInput, Select, TextInput, Radio } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreateStory() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'uncategorized',
    chapters: [],
    prologue: '',
  });
  const [currentChapter, setCurrentChapter] = useState({ title: '', content: '' });
  const [currentMode, setCurrentMode] = useState('chapter');
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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

  const addChapterOrPrologue = () => {
    if (currentMode === 'chapter') {
      if (!currentChapter.title || !currentChapter.content) {
        setPublishError('Please provide both a title and content for the chapter');
        return;
      }
      setFormData({
        ...formData,
        chapters: [...formData.chapters, currentChapter],
      });
      setCurrentChapter({ title: '', content: '' });
    } else {
      if (!formData.prologue) {
        setPublishError('Please provide content for the prologue');
        return;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentMode === 'chapter' && formData.chapters.length === 0) {
      setPublishError('Please add at least one chapter');
      return;
    }
    try {
      const res = await fetch('/api/story/create', {
        method: 'POST',
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

      setPublishError(null);
      navigate(`/stories/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-5 font-semibold'>Story Time...</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            value={formData.title}
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Author'
            required
            id='author'
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
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
        <div className='mt-5'>
          <h2 className='text-xl mb-2'>Add Chapter or Prologue</h2>
          <div className='flex gap-4 mb-4'>
            <Radio
              id='chapter'
              name='content-type'
              value='chapter'
              checked={currentMode === 'chapter'}
              onChange={() => setCurrentMode('chapter')}
              label='Chapter'
            />
            <Radio
              id='prologue'
              name='content-type'
              value='prologue'
              checked={currentMode === 'prologue'}
              onChange={() => setCurrentMode('prologue')}
              label='prologue'
            />
          </div>
          {currentMode === 'chapter' && (
            <>
              <TextInput
                type='text'
                placeholder='Chapter Title'
                value={currentChapter.title}
                onChange={(e) =>
                  setCurrentChapter({ ...currentChapter, title: e.target.value })
                }
              />
              <ReactQuill
                theme='snow'
                placeholder='Chapter content...'
                className='h-48 mt-4'
                value={currentChapter.content}
                onChange={(value) =>
                  setCurrentChapter({ ...currentChapter, content: value })
                }
              />
              <Button
                type='button'
                className='bg-[#A500E0] hover:!bg-[#A500E0] mt-4'
                onClick={addChapterOrPrologue}
              >
                Add Chapter
              </Button>
            </>
          )}
          {currentMode === 'prologue' && (
            <>
              <ReactQuill
                theme='snow'
                placeholder='Prologue content...'
                className='h-48 mt-4'
                value={formData.prologue}
                onChange={(value) =>
                  setFormData({ ...formData, prologue: value })
                }
              />
              <Button
                type='button'
                className='bg-[#A500E0] hover:!bg-[#A500E0] mt-4'
                onClick={addChapterOrPrologue}
              >
                Add Prologue
              </Button>
            </>
          )}
        </div>
        <Button
          type='submit'
          className='bg-[#A500E0] hover:!bg-[#A500E0] w-36 mx-auto my-2'
        >
          Publish
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
