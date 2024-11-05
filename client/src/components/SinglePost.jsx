import { Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    <div>
     
    </div>
  )
}
