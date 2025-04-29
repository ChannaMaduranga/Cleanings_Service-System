import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function Services() {
    const navigate=useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:8081/services');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };

    fetchServices();
  }, []);

//   add servuces

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
     const res= await axios.post('http://localhost:8081/services', { name });
      setName('');
      toast.success(res.data.message);
      closePopup();
      window.location.reload();
    } catch (err) {
      console.error('Error adding service:', err);
    }
  };

//   delete service
const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
  
    try {
      const res = await axios.delete(`http://localhost:8081/services/${id}`);
      toast.success(res.data.message);
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
    }
  };


  return (
    <div className='h-[89.5%] w-full md:w-[70%] lg:w-[80%] relative mx-auto mt-16 '>
      <div className='flex w-full justify-center mb-8'>
        <button
          onClick={openPopup}
          className='text-lg font-semibold bg-[#424dc9] px-4 py-2 text-white rounded-lg'
        >
          Add Service
        </button>
      </div>

      <h2 className='m-4 flex justify-center font-semibold text-2xl'>
        Service List
      </h2>

      <div className="overflow-x-auto bg-white md:m-8 my-4 h-[95%] w-[100%] md:px-[20%] relative">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">#</th>
              <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">Service Type</th>
              <th className="px-4 md:px-6 py-3 border-b text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 border-b text-gray-700">{index + 1}</td>
                <td className="px-4 md:px-6 py-4 border-b text-gray-700">{service.name}</td>
                <td className="px-4 md:px-6 py-4 border-b text-gray-700">
                  <div className="flex space-x-4">
                    
                    <button className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(service.id)}>
                      <AiOutlineDelete className="text-2xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-[#f8f9ff] shadow-lg w-full max-w-lg mx-4 rounded-lg p-4'>
            <div className='flex justify-between items-center px-6 py-4 border-b border-[#333]'>
              <h2 className='text-xl text-[#283299] font-semibold'>Add Service</h2>
              <button className='text-gray-500 text-2xl hover:text-gray-800' onClick={closePopup}>&times;</button>
            </div>
            <div className='p-6'>
              <div>
                <label className='block mb-2 text-sm font-medium'>Service Type</label>
                <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
                  <input
                    type="text"
                    value={name}
            onChange={(e) => setName(e.target.value)}
                    placeholder='Enter service type'
                    className='bg-transparent flex-1 text-gray-800 focus:outline-none'
                    required
                  />
                </div>
              </div>
              <button  onClick={handleSubmit} className='w-full bg-[#414bbd] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-[#343c94]'>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
