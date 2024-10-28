import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import{deleteUserFailure,deleteUserSuccess,deleteUserStart} from "../redux/user/userSlice.js"
import {app} from "../firebase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
export default function Profile() {
 const {currentUser,error,loading} = useSelector(state => state.user);
 const fileRef = useRef(null);
 const dispatch = useDispatch();
 const [file,setFile] = useState(undefined);
 const [filePerc,setFilePerc] = useState(0);
 const [fileError,setFileError] = useState(false);
 const [formData,setFormData] = useState({});

 useEffect(() => {
  if (file) {
    console.log(file);
    
    handleFileUpload(file);
  }
}, [file]);

const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
        setFileError(error)
    },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
      setFormData({...FormData,avatar:downloadURL})
    )
   }
  );
};


const handleDeleteUser = async (e) => {
   e.preventDefault();
   dispatch(deleteUserStart())
   try {
    const res = await fetch(`api/user/delete/${currentUser._id}`,{
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success=== false) {
      dispatch(deleteUserFailure(data.message))
      return;
    }
    dispatch(deleteUserSuccess(data))
   } catch (error) {
    dispatch(deleteUserFailure(error.message))
   }
}


function handleChange(e) {
  setFormData({
   ...formData,
   [e.target.id]:e.target.value
  });
}
 
  return (
   <div className='max-w-lg mx-auto p-3 w-full'>
         <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
         <form  className='flex flex-col gap-4'>
          <input type="file" 
           ref={fileRef}
           className='hidden'
             accept='image/*'
           onChange={(e) => setFile(e.target.files[0])}
            />
         <img
          src={formData.avatar|| currentUser.avatar}
          alt='profile'
          onClick={(()=>fileRef.current.click())}
          className='rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2'
        />
       <p className='text-sm self-center'>
          {fileError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
          </p>
        <input type="text" onChange={handleChange} id='username' 
         className='border p-2 rounded-lg outline-none focus:border-cyan-400' defaultValue={currentUser.username} />

        <input type="text" onChange={handleChange} id='email'   defaultValue={currentUser.email}  
         className='border p-2 rounded-lg outline-none focus:border-cyan-400' />

        <input type="text" onChange={handleChange} id='password' placeholder='*****'
         className='border p-2 rounded-lg outline-none focus:border-cyan-400' />

         <button className='border-t-2 border-b border-r border-l p-2 rounded-lg border-x-purple-700 border-y-blue-300 hover:bg-gradient-to-b from-purple-500 to-blue-300 hover:text-white'  >Update</button>
         </form>
         <div className='flex justify-between mt-5'>
        <span
          
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteUser}
        >
          Delete account
        </span>
        <span  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700'>{error?error:""}</p>
   </div>
  )
}
