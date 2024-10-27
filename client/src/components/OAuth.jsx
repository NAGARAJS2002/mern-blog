import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
export default function OAuth() {
  return (
    <button className=' border-2 p-2 rounded-lg hover:text-white border-x-red-500 border-y-orange-500 hover:bg-gradient-to-t from-red-400 to-orange-400'>
     <div className='flex justify-center items-center gap-2'>
     <AiFillGoogleCircle className='w-6 h-6 '/> Continue with Google
     </div>
    </button>
  )
}
