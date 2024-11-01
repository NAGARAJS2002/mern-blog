import { Table,Modal,Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import React, { useEffect, useState } from 'react'
import{useSelector} from "react-redux";
import { Link } from 'react-router-dom';
export default function posts() {
    const {currentUser} = useSelector(state => state.user);
    const [userPosts,setUserPosts] = useState([]);
    const [showModal,setShowModal] = useState(true);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    console.log(userPosts);
    
    useEffect(()=>{
    const getUserPost = async () => {
        try {
            const res = await fetch(`/api/user/posts/${currentUser._id}`,{
                cache: 'no-store'
            });
            const data = await res.json();
            if (res.ok) {
               setUserPosts(data);
               return; 
            }else {
                console.error('Failed to fetch posts:', data);
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }
    getUserPost()
      
    },[currentUser._id]);

    const handleDeletePost = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/post/delete/${postIdToDelete}/${currentUser._id}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserPosts((prev) =>
            prev.filter((post) => post._id !== postIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
  return (
    <div className='overflow-x-scroll table-auto  md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {userPosts && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to='/post' >
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to='/post'
                      className='font-medium text-gray-900 dark:text-white'
                  
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                       onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to='/update-post'
                      className='text-teal-500 hover:underline'
                   
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
         
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
       <Modal size='md' popup show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Body>
            <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400  mb-4 mx-auto' />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
            </div>
            </Modal.Body>
          </Modal.Header>
       </Modal>
    </div>
  )
}
