import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminNav() {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center   w-[80%] mx-auto h-[10vh] border-b-2'>
    <div className='flex items-center  cursor-pointer font-semibold'>
        <img src="" alt="" />
        <h1 className='text-2xl text-[#2733b5] -z-50' onClick={()=>navigate('/')}>Admin Panel</h1>
    </div>
    <div className='flex items-center  cursor-pointer font-semibold text-lg gap-8 '>
        <h1 className='flex  ' onClick={()=>navigate('/')}></h1>
        <h1 className='' onClick={()=>navigate('/admin/bookings')}>Booking</h1>
        <h1 className='' onClick={()=>navigate('/admin/services')}>Services</h1>

        <h1 className='' onClick={()=>navigate('/login')}>logout</h1>
    </div>
</div>
  )
}

export default AdminNav