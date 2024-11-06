
import {Navbar , TextInput,Button,Dropdown,Avatar} from "flowbite-react"
import {Link , useLocation} from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai"
import { useSelector,useDispatch } from 'react-redux'
import{signOutStart , deleteUserFailure , deleteUserSuccess} from "../redux/user/userSlice.js"
export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const handleSignout =async  () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  
  return (
   <Navbar className='border-b-2'>
    <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'>
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Mern</span>
    Blog
    </Link>
    <form >
          <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          ></TextInput>
    </form>
    <div className='flex gap-2 md:order-2'>
    {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.avatar} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link to={'/user-post'}>
              <Dropdown.Item>Posts</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
       <Navbar.Toggle/>
    </div>
    <Navbar.Collapse>
           <Navbar.Link active={path === '/'} as={'div'}>
            <Link to={'/'}>
            Home
            </Link>
           </Navbar.Link>
           <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to={'/about'}>
            About
            </Link>
           </Navbar.Link>
           <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to={'/projects'}>
            Project
            </Link>
           </Navbar.Link>
       </Navbar.Collapse>
   </Navbar>
  )
}
