import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {app} from "../firebase.js"
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from "firebase/storage";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function CreatePost() {
  const [file , setFile] = useState(null);
  const [imageUploadError,setImageUploadError] = useState(null)
  const [imageUploadProgress,setImageUploadProgress] = useState(null)
  const [formData,setFormData] = useState({});
  const [publishError,setPublishError] = useState(false)
  const navigate = useNavigate()
  console.log(formData);
  const {currentUser} = useSelector(state => state.user)

const handleUpdloadImage = () => {
  try {
    
   if (!file) {
      setImageUploadError('please select image');
      return;
   }
   const  storage =  getStorage(app);
   const fileName = new Date().getTime() + '-' + file.name;
   const storageRef = ref(storage,fileName);
   const uploadTask = uploadBytesResumable(storageRef, file);

   uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
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
} 
   
   catch (error) {
    setImageUploadError('image upload filed')
    setImageUploadProgress(null)
    console.log(error);
    
  }
}


const handleSubmit = async (e) => {
  e.preventDefault();
try {
  const res = await fetch('/api/post/create',{
    method: 'POST',
    headers:{
      'Content-Type': "application/json"
    },
    body: JSON.stringify(formData ),
  })
  const data = await res.json();
  if (!res.ok) {
    setPublishError(data.message)
    return;
  }
  if (res.ok) {
    setPublishError(null)
    navigate(`/posts`)
  }
} catch (error) {
  
}
}



  return (
 
<div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='flex-1 border p-2 rounded-lg '/>
          <select 
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className='border rounded-lg outline-none'>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted  p-2'>
          <input
            type='file'
            accept='image/*'
            className=' rounded-md border p-1'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button disabled={imageUploadProgress} onClick={handleUpdloadImage} type='button' className='border  py-2 border-x-blue-500 via-purple-500 border-y-pink-500 rounded-md' >
          {imageUploadProgress ? (
          
          
            <div> 
               <p className='text-blue-500 font-semibold text-xl'>{`${imageUploadProgress || 0}%`}</p>
            </div>
        
            ) : (
              'Upload Image'
            )}
         </button>
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
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button type='submit'  className='p-2 mt-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'>
          Publish
        </button>
    
      </form>
      {publishError && (
          <p className='mt-5 text-red-700'>
            {publishError}
          </p>
        )}
    </div>

 


  )
}

