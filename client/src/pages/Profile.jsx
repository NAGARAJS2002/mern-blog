import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import{deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
 updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  signOutStart
} from "../redux/user/userSlice.js"
import {app} from "../firebase"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
export default function Profile() {
 const {currentUser,error,loading} = useSelector(state => state.user);
 const [updateSuccess,setUpdateSuccess] = useState(false)
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
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }

    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};



const handleDeleteUser = async () => {
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

const handleUserSignOut =async  () => {
  try {
    dispatch(signOutStart());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
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
   <div className='p-3 max-w-lg mx-auto  w-full'>
         <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

        <input type="email" onChange={handleChange} id='email'   defaultValue={currentUser.email}  
         className='border p-2 rounded-lg outline-none focus:border-cyan-400' />

        <input type="password" onChange={handleChange} id='password' placeholder='*****'
         className='border p-2 rounded-lg outline-none focus:border-cyan-400' />

         <button className='border-t-2 border-b border-r border-l p-2 rounded-lg border-x-purple-700 border-y-blue-300 hover:bg-gradient-to-b from-purple-500 to-blue-300 hover:text-white'  >{loading ? "Loading...":"Update"}</button>
         </form>
       <Link to={'/post'}>    <button className='border-2 p-2 mt-4 rounded-lg w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white '>CreatePost</button></Link>
         <div className='flex justify-between mt-5'>
        <span
          
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteUser}
        >
          Delete account
        </span>
        <span onClick={handleUserSignOut}  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 pt-2 text-center'>{error?error:""}</p>
      <p className='text-center pt-2 text-green-700'>{updateSuccess ? 'User is updated successfully!': ""}</p>
   </div>
  )
}
