import React from 'react'
import { MdEditNote } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

function BokkingCard() {
  return (
    <div className='w-[280px]  bg-[#201c4a] p-5 rounded-lg mb-4 h-[210px]'>
            <div className='flex items-center gap-5'>
                <button className='bg-[#f6b100] p-2 text-lg font-bold rounded-full '>CM</button>
                <div className='flex items-center justify-between w-[100%]'>
                    <div className='flex flex-col items-start gap-1'>
                        <h1 className='text-[#f5f5f5] text-base font-semibold tracking-wide'>Channa Maduranga</h1>
                        
                    </div>

                   
                </div>
            </div>
            <div className='flex flex-col justify-start  mt-4 text-[#ababab]'>
                <p>No.12, matugama, Kalutara</p>
                <p>January 22, 2025 08:32: PM</p>
               
            </div>
            <hr className='w-full mt-4 border-t-1 border-gray-500' />
            <div className='flex items-center justify-between mt-4'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold '>Deep Cleaning</h1>
                <p className='  font-semibold flex text-xl'>
                    <MdEditNote className='text-[#ffffff] cursor-pointer'/>
                    <MdOutlineDelete className='text-[#f24949] cursor-pointer'/>
                </p>
            </div>
        </div>
  )
}

export default BokkingCard