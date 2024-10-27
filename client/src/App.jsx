import React from 'react'
import {BrowserRouter,Routes ,Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from './components/Header'
import PrivateRouter from "./components/PrivateRouter"
import Profile from './pages/Profile'
export default function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/sign-in' element={<SignIn/>} />
    <Route element={<PrivateRouter/>}>
     <Route path='/profile' element={<Profile/>} />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}
