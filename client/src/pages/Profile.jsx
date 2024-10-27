import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
 const {currentUser} = useSelector(state => state.user)
  return (
   <div className='max-w-lg mx-auto p-3 w-full'>
         <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
         <form className='flex flex-col gap-4'>
         <img
          src={ currentUser.avatar}
          alt='profile'
          className='rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2'
        />
        <input type="text" id='username' className='border p-2 rounded-lg outline-none focus:border-cyan-400' />
        <input type="text" id='email' className='border p-2 rounded-lg outline-none focus:border-cyan-400' />
        <input type="text" id='password'  className='border p-2 rounded-lg outline-none focus:border-cyan-400' />

         <button className='border-t-2 border-b border-r border-l p-2 rounded-lg border-x-purple-700 border-y-blue-300 hover:bg-gradient-to-b from-purple-500 to-blue-300 hover:text-white'  >Update</button>
         </form>
         <div className='flex justify-between mt-5'>
        <span
          
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
   </div>
  )
}
