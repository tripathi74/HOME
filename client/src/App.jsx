import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';
import CreateListing from './pages/CreateLiting';
import UpdateListing from './pages/updateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes> 
      <Route path='/' element={<Home/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-listing' element={<CreateListing/>} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing/>}
          />
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='listing/:listingId' element={<Listing/>}/>
      <Route path='/search' element={<Search/>} />

    </Routes>
    </BrowserRouter>
  )
}
