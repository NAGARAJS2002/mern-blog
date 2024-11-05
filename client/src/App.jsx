import React from 'react'
import {BrowserRouter,Routes ,Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from './components/Header'
import PrivateRouter from "./components/PrivateRouter"
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Posts from './pages/posts'
import Projects from './pages/Projects'
import Home from './pages/Home'
import About from './pages/About'
import SinglePost from './components/SinglePost'
import UpdatePost from './pages/UpdatePost'
export default function App() {
  
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/about' element={<About/>} />
    <Route path='/projects' element={<Projects/>} />
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/sign-in' element={<SignIn/>} />
    <Route path='/post/:id' element={<SinglePost/>}/>
    <Route element={<PrivateRouter/>}>
     <Route path='/profile' element={<Profile/>} />
     <Route path='/create-post' element={<CreatePost/>}/>
     <Route path='/posts' element={<Posts/>} />
     <Route path='/update-post/:id' element={<UpdatePost/>} />
    </Route>
  
   </Routes>
   </BrowserRouter>
  )
}
