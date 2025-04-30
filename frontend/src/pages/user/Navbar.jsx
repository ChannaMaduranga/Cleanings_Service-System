import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='relative'>
     
      <div className='flex justify-between items-center w-[80%] mx-auto h-[10vh] border-b-2'>
        <div className='flex items-center cursor-pointer font-semibold'>
          <img src='' alt='' />
          <h1 className='text-2xl text-[#2733b5]' onClick={() => navigate('/')}>Cleanings</h1>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center cursor-pointer font-semibold text-lg gap-8'>
          <h1 onClick={() => navigate('/')}>Home</h1>
          <h1 onClick={() => navigate('/mybookings')}>My Bookings</h1>
          {isLoggedIn ? (
            <h1 onClick={handleLogout}>Logout</h1>
          ) : (
            <h1 onClick={() => navigate('/login')}>Login</h1>
          )}
        </div>

        
        <div className='md:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-3xl'>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile  Menu */}
      {isMenuOpen && (
        <div className='md:hidden w-full bg-gray-100 px-6 py-4 absolute'>
          <div className='flex flex-col font-semibold text-lg gap-4'>
            <h1 className="cursor-pointer " onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Home</h1>
            <h1 className="cursor-pointer " onClick={() => { navigate('/mybookings'); setIsMenuOpen(false); }}>My Bookings</h1>
            {isLoggedIn ? (
              <h1 className="cursor-pointer " onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</h1>
            ) : (
              <h1 className="cursor-pointer " onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
