

import React, { useState } from 'react'
import { AiOutlineSearch} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [avatarToogle , setAvatarToogle] = useState(false)
  return (
    <header className='border-b-2'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
<Link to={'/'}>

<h1 className='font-bold text-sm sm:text-xl px-4 py-2 rounded-md flex flex-wrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <span className='text-white '>Mern</span>Blog
          </h1>
</Link>
<form
        
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-44'
       
          />
          <button>
            <AiOutlineSearch className='text-slate-600' />
          </button>
        </form>


  <ul className='flex gap-4'>
 
      {currentUser ? (
        <>
        <img
        onClick={(() => setAvatarToogle(!avatarToogle))}
          className=' relative rounded-full h-10 w-10 object-cover cursor-pointer'
          src={currentUser.avatar}
          alt='profile'
        />
          {
          avatarToogle &&  <ul className='absolute top-16 right-36 shadow-lg py-2 text-sm  rounded-lg'>
          <li className='flex  flex-col p-3 border cursor-pointer'>{currentUser.username}<span className='font-semibold'>{currentUser.email}</span></li>
          <Link to={'/profile'}><li onClick={(() => setAvatarToogle(!avatarToogle))} className='p-3 border hover:bg-slate-50'>Profile</li></Link>
          <li className='p-3 border hover:bg-slate-50'>User post</li>
          <li className='p-2 cursor-pointer hover:bg-slate-50'>SignOut</li>
        </ul>
         }
        </>
      ) : (
        <li className=' text-slate-700 hover:underline'> Sign in</li>
      )}
  
  </ul>

      </div>
    </header>
  )
}
