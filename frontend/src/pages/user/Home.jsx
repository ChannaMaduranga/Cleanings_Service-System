import React, { useState, useEffect } from 'react';
import headerImg from '../../assets/headerImg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [customer_name, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [date_time, setDateTime] = useState('');
  const [service_type, setServiceType] = useState('');

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');


  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const [services, setServices] = useState([]);


  // fetch services table data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:8081/services');
        setServices(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };

    fetchServices();
  }, []);

  const handleBookingSubmit = async () => {
    if (!customer_name || !address || !date_time || !service_type) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      console.log('Token:', user);
      const res = await axios.post(
        'http://localhost:8081/api/bookings',
        {
          customer_name,
          address,
          date_time,
          service_type,
          userId: user.id,
        },
        { withCredentials: true }

      );
      if (res?.data?.message && res?.data?.message == "Booking successful") {
        toast.success('Booking submitted!');
      }
      else {
        toast.error("Bookig error")
      }
      closePopup();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking.');
    }
  };

  return (
    <div className='h-[80vh] w-[80%] mx-auto'>
      <div className=' md:flex justify-center h-full items-center w-full md:flex-row-reverse '>


        <div className='md:w-[80%] mt-8 md:mt-0'>
          <img src={headerImg} alt='Header' className='w-full' />
        </div>

        <div className='md:w-2/3 z-20'>
          <h1 className='text-3xl text-center md:text-4xl lg:text-6xl font-semibold px-4 mx-auto md:text-left'>
            Professional Cleaning Service for You!
          </h1>
          <p className='p-4 text-center md:text-left'>
            Experience a spotless home or office with our professional cleaning solutions. Book your service easily and let us do the hard work for you!
          </p>
          <div className='p-4 flex md:gap-4 pt-4 justify-center gap-2 md:justify-start'>
            <button
              onClick={() => (isLoggedIn ? openPopup() : navigate('/login'))}
              className='px-4 py-2 bg-[#4955dd] text-white font-semibold md:rounded-lg hover:bg-[#2733b5] rounded-3xl'
            >
              Book Now
            </button>
            <button className='px-4 py-2 border-2 border-[#2733b5] text-black font-semibold md:rounded-lg rounded-3xl hover:bg-[#2733b5] hover:text-white'>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Booking Popup */}
      {isPopupOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-[#f8f9ff] shadow-lg w-full max-w-lg mx-4 rounded-lg p-4'>
            <div className='flex justify-between items-center px-6 py-4 border-b border-[#333]'>
              <h2 className='text-xl text-[#283299] font-semibold'>Booking Service</h2>
              <button className='text-gray-500 text-2xl hover:text-gray-800' onClick={closePopup}>
                &times;
              </button>
            </div>
            <div className='p-6 space-y-4'>
              <div>
                <label className='block mb-2 text-sm font-medium'>Customer Name</label>
                <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
                  <input
                    type='text'
                    placeholder='Enter Customer Name'
                    value={customer_name}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className='bg-transparent flex-1 text-gray-800 focus:outline-none'
                  />
                </div>
              </div>

              <div>
                <label className='block mb-2 text-sm font-medium'>Address</label>
                <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
                  <input
                    type='text'
                    placeholder='Enter Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='bg-transparent flex-1 text-gray-800 focus:outline-none'
                  />
                </div>
              </div>

              <div>
                <label className='block mb-2 text-sm font-medium'>Date & Time</label>
                <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
                  <input
                    type='datetime-local'
                    value={date_time}
                    onChange={(e) => setDateTime(e.target.value)}
                    className='bg-transparent flex-1 text-gray-700 focus:outline-none'
                  />
                </div>
              </div>

              <div>
                <label className='block mb-2 text-sm font-medium'>Service Type</label>
                <div className='flex items-center rounded-lg p-3 px-4 bg-[#ebedff]'>
                  <select
                    value={service_type}
                    onChange={(e) => setServiceType(e.target.value)}
                    className='bg-transparent flex-1 text-gray-700 focus:outline-none'
                  >
                    <option value='' disabled>Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleBookingSubmit}
                className='w-full bg-[#414bbd] text-[#f5f5f5] rounded-lg py-3 hover:bg-[#343c94]'
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
