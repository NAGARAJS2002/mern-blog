import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
  return (
 
<div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1 border p-2 rounded-lg '/>
          <select className='border rounded-lg outline-none'>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <input
            type='file'
            accept='image/*'
            className='rounded-lg border p-1'
          />
          <button type='button' className='border p-1 border-x-blue-500 via-purple-500 border-y-pink-500 rounded-md' >
        Upload Image </button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
        />
        <button type='submit' className='p-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white'>
          Publish
        </button>
    
      </form>
    </div>

 


  )
}

