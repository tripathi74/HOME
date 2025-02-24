import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { QAuth } from '../components/QAuth';

export default function SignUp() {

  const [formData, setFormData] = useState ({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange =(e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
    const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  
  return (
    <div className='pt-20 p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold mt-7 mb-2 text-colorPrimary'>Sign In</h1>
      <p className='text-colorDarkGray text-sm mb-5 text-center'>
        (Login if you want to resister your property!)
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email'
        className='bg-cyan-50 border p-3 rounded-lg shadow-md' id='email' 
        onFocus={(e) => (e.target.style.outline = 'none')}
        onChange={handleChange}></input>
        <input type='password' placeholder='password'
        className='bg-cyan-50 border p-3 rounded-lg shadow-md' id='password' 
        onFocus={(e) => (e.target.style.outline = 'none')}
        onChange={handleChange}></input>
        <button disabled={loading} className='bg-colorPrimary text-white p-3 
        rounded-lg uppercase hover:opacity-85 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <QAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-colorPrimary font-semibold hover:underline'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
