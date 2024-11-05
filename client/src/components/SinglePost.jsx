import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SinglePost() {
const [error,setError] = useState(false)
const [getPost ,setGetPost] = useState(null)
const [loading ,setLoading] = useState(false)
const {id} = useParams()

console.log(getPost);

  useEffect(() => { 
    
    try {
      setLoading(true)
      const fetchPost = async () => {
        const res = await fetch(`/api/post/get/${id}`);
        const data = await res.json();
        if (!res.ok) {
        setError(true)
        setLoading(false)
          return;
        }
        if (res.ok) {
          setGetPost(data);
          setError(false)
        setLoading(false)
        }
      };
  
      fetchPost();
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }, [id]);



  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto mon-h-screen'>
     <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-3xl mx-auto lg"text-4xl  '>{getPost&&getPost.title}</h1>
     <div className='self-center mt-5'>
     <Button color='gray' pill  size='xs'>{getPost&& getPost.category}</Button>
     </div>
    <img className='p-3 max-h-[600px] w-full object-cover' src={getPost&& getPost.image} alt="" />
   <div className='flex justify-between p-3 border-b-slate-300 mx-auto w-full max-w-2xl test-xs '>
       <span>{getPost && new Date(getPost.createdAt).toLocaleDateString()}</span>
       <span className='italic'>
          {getPost && (getPost.content.length / 1000).toFixed(0)} mins read
        </span>
   </div>
   <div   dangerouslySetInnerHTML={{ __html: getPost && getPost.content }} className='p-3 max-w-2xl mx-auto w-full post-content '>

   </div>
    </main>
  )
}
