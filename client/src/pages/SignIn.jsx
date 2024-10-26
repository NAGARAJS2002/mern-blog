import React from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <div className='min-h-screen mt-20'>
     <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
     <div className='flex-1'>
      <Link to={'/'} className='font-bold dark:text-white text-4xl'>
      <button className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>NR Blog</button>
      </Link>
     
        <p className='text-sm max-w-sm text-slate-600 pt-3'>This is a demo project. You can sign in with your email and password or with Google.</p>
      </div>
  
 <div className='flex-1 '>

  <form className='flex flex-col gap-5  ' >
   
    <input type="email"
    id="email"
    placeholder='name@gmail.com'
       className=' border p-2 rounded-lg outline-none focus:border-cyan-500'
     />

    <input type="password"
    id="password"
    placeholder='*****'
       className=' border p-2 rounded-lg outline-none focus:border-cyan-500'
    />
    <button className='border p-2 rounded-lg  bg-gradient-to-r from-purple-500 to-pink-500 text-white '>Sign In</button>
  </form>
  <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>

 </div>
 
    </div>
    </div>
  )
}