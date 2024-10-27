import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
import {app} from "../firebase.js"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {signInSuccess} from "../redux/user/userSlice.js";
import {useDispatch} from "react-redux"
export default function OAuth() {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const handleGoogleClick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
  console.log(result);
  

    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }),
    });
    const data = await res.json();
  console.log(data);
  
    dispatch(signInSuccess(data));
    navigate('/');
  } catch (error) {
    console.log('could not sign in with google', error);
  }
};
  return (
    <button onClick={handleGoogleClick} className=' border-2 p-2 rounded-lg hover:text-white border-x-red-500 border-y-orange-500 hover:bg-gradient-to-t from-red-400 to-orange-400'>
     <div className='flex justify-center items-center gap-2'>
     <AiFillGoogleCircle className='w-6 h-6 '/> Continue with Google
     </div>
    </button>
  )
}
