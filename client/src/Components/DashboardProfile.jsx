import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imgFileUploadProgress, setImgFileUploadProgress] = useState(null);
  const [imgFileUploadError, setImgFileUploadError] = useState(null);
  const imgRef = useRef();

  console.log(imgFileUploadError);

  const handleMouseHover = () => {
    console.log('Change Over');
  };

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
    setImageFileUploading(true);
    setImageFileUploadError(null);
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
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
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
          {imgFileUploadProgress && (
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
          )
          }
          <img
            src={imgFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        {imgFileUploadError && <Alert color='failure'>{imgFileUploadError}</Alert>}
        <Textarea
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <Textarea
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <Textarea type="text" id="password" placeholder="password" />
        <Button
          type="submit"
          className="bg-[#A500E0] hover:!bg-[#A500E0] text-white border-none my-2"
        >
          Update
        </Button>
      </form>
      {imgFileUploadError && (
        <div className="text-red-500 text-center mt-4">
          {imgFileUploadError}
        </div>
      )}
      <div className="text-[#FE5448] flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
