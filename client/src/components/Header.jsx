import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className='border-b-2'>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
<Link to={'/'}>

<h1 className='font-bold text-sm sm:text-xl px-4 py-2 rounded-md flex flex-wrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <span className='text-white px-1'>NR</span>
            <span className=''>Blog</span>
          </h1>
</Link>
  
        <form
       
          className='border p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-40'
         
          
          />
          <button className='bg'>
            <FaSearch className='text-slate-700' />
          </button>
        </form>
        <ul className='flex gap-4'>
        <Link to={'/sign-in'}>
        <li className=' border-2 px-5 py-2 items-center cursor-pointer rounded-md border-x-purple-500 border-y-blue-500 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white'> Sign in</li>
        </Link>
        </ul>
      </div>
    </header>
  )
}
