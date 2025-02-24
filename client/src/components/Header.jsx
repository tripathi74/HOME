import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
  return (
    <header className='bg-colorPrimary shadow-lg w-full fixed z-50 top-0'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-850'>YHOME</span>
        </h1>
            </Link>
        <form
           onSubmit={handleSubmit}
           className='bg-colorBackground p-3 rounded-lg flex items-center'
        > 
            <input 
            type='text' 
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            /> 
            <button>
            <FaSearch className='text-colorPrimary'/>
            </button>
        </form>
        <ul className='flex gap-4 font-semibold'>
            <Link to='/'>
            <li className='hidden sm:inline text-slate-850 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-850 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
            {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' 
                   src={currentUser.avatar} alt='Profile'></img>
            ) : (
                <li className=' text-slate-850 hover:underline'>SignIn</li>
            )}
            </Link>    
        </ul>
        </div>  
    </header>
  )
}
