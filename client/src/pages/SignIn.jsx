import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
const [formData,setformData] = useState({});
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);
const navigate = useNavigate()
function handleChange(e) {
  setformData({
    ...formData,
    [e.target.id]:e.target.value
  })
}

const  handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    if (data.success === false) {
      setLoading(false);
      setError(data.message)
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/')
  } catch (error) {
    setError(error)
  }
}
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

  <form className='flex flex-col gap-5  ' onSubmit={handleSubmit} >
   
    <input type="email"
    id="email"
    placeholder='name@gmail.com'
       className=' border p-2 rounded-lg outline-none focus:border-cyan-500'
       onChange={handleChange}
     />

    <input type="password"
    id="password"
    placeholder='*****'
       className=' border p-2 rounded-lg outline-none focus:border-cyan-500'
       onChange={handleChange}
    />
    <button  disabled={loading}className='border p-2 rounded-lg  bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity/85 '>
    {loading ? 'Loading...': "  Sign In"}
      </button>
  </form>
  <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>

    </div>
    {error&& <p>{error}</p>}
 
    </div>
    </div>
  )
}
