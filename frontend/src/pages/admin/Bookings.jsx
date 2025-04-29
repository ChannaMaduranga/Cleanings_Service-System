import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

function Bookings() {
  return (
    <div>
        <div className='h-[89.5%] w-full md:w-[70%] lg:w-[80%] relative mx-auto mt-16 '>
        
        
        
                                <h2 className='m-4 flex justify-center font-semibold text-2xl'>
                                    Bookings List
                                </h2>
        
                                <div className="overflow-x-auto   bg-white md:m-8 my-4 h-[95%] w-full md:p-8 relative">
                                    <table className="min-w-full table-auto border-collapse ">
                                        <thead className=''>
                                            <tr className="bg-gray-100 ">
                                                <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">#</th>
                                                <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">Customer</th>
                                                <th className="hidden lg:table-cell   lg: px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold ">Date & Time</th>
                                                <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold ">Address</th>
                                                <th className=" hidden lg:table-cell px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">Type</th>
                                                <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className=' '>
                                           
                                                <tr  className="hover:bg-gray-50">
                                                    <td className="px-4 md:px-6 py-4 border-b text-gray-700">1</td>
                                                    <td className="px-4 md:px-6 py-4 border-b text-gray-700">name</td>
                                                    <td className="hidden lg:table-cell lg:px-4 lg:md:px-6 py-4 border-b text-gray-700"> date</td>
                                                    <td className="px-4 md:px-4 py-4 border-b text-gray-700">adreess</td>
                                                    <td className="hidden lg:table-cell px-4 md:px-6 py-4 border-b text-gray-700">deep clean</td>
                                                    
                                                    <td className="px-4 md:px-6 py-4 border-b text-gray-700">
                                                        <div className="flex space-x-4">
                                                            <button
                                                                
                                                                className="text-green-600 hover:text-green-800"
                                                            >
                                                                <FiEdit className="text-2xl" />
                                                            </button>
                                                            <button
                                                               
                                                                className="text-red-600 hover:text-red-800">
                                                                <AiOutlineDelete className="text-2xl" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                        
                                        </tbody>
                                    </table>
                                </div>
        
                            </div>
    </div>
  )
}

export default Bookings