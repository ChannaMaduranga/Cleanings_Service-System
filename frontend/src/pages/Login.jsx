import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  



function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/login', {
        username,
        password,
      },{
        withCredentials: true,
      });
      console.log(res.data.user)
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('user', JSON.stringify(res?.data?.user));
        toast.success('Admin login successful');
        navigate('/admin');
      }
      else {

        localStorage.setItem('user', JSON.stringify(res?.data?.user));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
     
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-[#f8f9ff] shadow-lg md:w-full max-w-lg mx-4 rounded-lg p-4 w-[80%]'>
        <div className='flex justify-between items-center px-6 py-4 border-b border-[#333]'>
          <h2 className='text-xl text-[#283299] font-semibold'>Login</h2>
          <button
            className='text-gray-500 text-2xl hover:text-gray-800'
            onClick={() => navigate('/')}
          >
            &times;
          </button>
        </div>
        <form className='p-6' onSubmit={login}>
          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Username</label>
            <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
              <input
                type='text'
                placeholder='Enter Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='bg-transparent flex-1 text-gray-800 focus:outline-none'
                required
              />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium'>Password</label>
            <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-transparent flex-1 text-gray-800 focus:outline-none'
                required
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-[#414bbd] text-[#f5f5f5] rounded-lg py-3 mt-4 hover:bg-[#343c94]'
          >
            Login
          </button>

          <p className='justify-center flex pt-4'>
            Don't have an account?
            <span
              onClick={() => navigate('/signup')}
              className='cursor-pointer text-[#414bbd] px-2'
            >
              Create your account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
