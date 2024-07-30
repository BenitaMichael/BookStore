import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess
} from '../redux/user/userSlice';

import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const DashboardProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imgFileUploadProgress, setImgFileUploadProgress] = useState(null);
  const [imgFileUploadError, setImgFileUploadError] = useState(null);
  const [imgFileUploading, setImgFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const imgRef = useRef();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImgFileUploadError('File size must be less than 2MB');
      } else {
        setImgFile(file);
        setImgFileUrl(URL.createObjectURL(file));
        // Clear any previous error
        setImgFileUploadError(null);
      }
    }
  };

  useEffect(() => {
    if (imgFile) {
      uploadImg();
    }
  }, [imgFile]);

  const uploadImg = async () => {
    setImgFileUploading(true);
    setImgFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    // Method to get information on the upload
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImgFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImgFileUploadProgress(null);
        setImgFile(null);
        setImgFileUrl(null);
        setImgFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImgFileUploading(false);
          setImgFileUploadProgress(null);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made')
      return;
    }
    if (imgFileUploading) {
      setUpdateUserError('Please wait for the image to upload')
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message)
    }
  };
  
  const handleDeleteUser = async() => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 w-full">
      <h1 className="my-6 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          ref={imgRef}
          hidden
        />

        <div
          className={`relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ${
            imgFileUploadProgress &&
            imgFileUploadProgress < 100 &&
            'opacity-60'
          }`}
          onClick={() => imgRef.current.click()}
        >
          {imgFileUploadProgress && imgFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imgFileUploadProgress || 0}
              text={`${imgFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imgFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imgFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        {imgFileUploadError && <Alert color="failure">{imgFileUploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-[#A500E0] hover:!bg-[#A500E0] text-white border-none my-3"
          disabled={loading || imgFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {
          currentUser.isAdmin && (
            <Link to={'/create-story'}>
              <Button
                type='button'
                outline
                className='bg-[#FE5448] hover:!bg-[#FE5448] text-white border-none my-3 w-full'
              >
                Create a Story
              </Button>
            </Link>
            
          )
        }
      </form>
      {imgFileUploadError && (
        <div className="text-red-500 text-center mt-4">
          {imgFileUploadError}
        </div>
      )}
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}

      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

      <Modal show={showModal} 
      onClose={() => setShowModal(false)} 
      popup size='md'>
        <ModalHeader/>
        <ModalBody>
          <HiOutlineExclamationCircle className='h-14 w-14 text-red-500 mb-4 mx-auto'/>
          <h3 className='mb-5 text-lg text-gray-600 text-center'>Are you sure you want to delete your account??</h3>
          <div className="text-[#FE5448] flex justify-between mt-5">
            <Button onClick={handleDeleteUser} color='failure'>Yes, I'm Sure</Button>
            <Button onClick={() => setShowModal(false)} color='gray'>Cancel</Button>
          </div>
        </ModalBody>
      </Modal>
      <div className="text-[#FE5448] flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
