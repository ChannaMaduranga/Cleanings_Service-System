import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdEditNote, MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

function BokkingCard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    const [bookings, setBookings] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = (booking) => {
        setEditingBookingId(booking.id);
        setCustomerName(booking.customer_name);
        setAddress(booking.address);
        setDateTime(booking.date_time?.slice(0, 16)); 
        setServiceType(booking.service_id);
        setIsPopupOpen(true);
    };
    
    const closePopup = () => setIsPopupOpen(false);
    const [services, setServices] = useState([]);
    const [customer_name, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [date_time, setDateTime] = useState('');
    const [service_type, setServiceType] = useState('');
    const [editingBookingId, setEditingBookingId] = useState(null);


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/bookings/${userId}`, {
                    withCredentials: true,
                });
                setBookings(res.data);
                // console.log("booking 1", res.data);
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/bookings/${id}`, {
                withCredentials: true,
            });
            // Filter out deleted booking from state
            setBookings((prev) => prev.filter((booking) => booking.id !== id));
            toast.error("Delete Successful");
        } catch (err) {
            console.error('Failed to delete booking:', err);
        }
    };

// fetch services for form
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


    //   update
    const handleUpdateBooking = async () => {
        try {
            await axios.put(`http://localhost:8081/api/bookings/${editingBookingId}`, {
                customer_name,
                address,
                date_time,
                service_type,
            }, {
                withCredentials: true,
            });
    
            // Refresh bookings after update
            const res = await axios.get(`http://localhost:8081/api/bookings/${userId}`, {
                withCredentials: true,
            });
            setBookings(res.data);
            toast.success("Updated Successful")
            closePopup();
        } catch (err) {
            console.error("Failed to update booking:", err);
        }
    };
    

    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="w-[280px] bg-[#201c4a] p-5 rounded-lg mb-4 h-[210px]"
                    >
                        <div className="flex items-center gap-5">
                            <button className="bg-[#f6b100] p-2 text-lg font-bold rounded-full">
                                {booking.customer_name
                                    ?.split(' ')
                                    .slice(0, 2)
                                    .map((name) => name.charAt(0).toUpperCase())
                                    .join('')
                                }

                            </button>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col items-start gap-1">
                                    <h1 className="text-[#f5f5f5] text-base font-semibold tracking-wide">
                                        {booking.customer_name}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-start mt-4 text-[#ababab] text-sm">
                            <p>{booking.address}</p>
                            <p>{new Date(booking.date_time).toLocaleString()}</p>
                        </div>

                        <hr className="w-full mt-4 border-t border-gray-500" />

                        <div className="flex items-center justify-between mt-4">
                            <h1 className="text-[#f5f5f5] text-lg font-semibold">
                                {booking.name}
                            </h1>
                            <div className="flex text-xl">
                                <MdEditNote onClick={() => openPopup(booking)} className="text-[#ffffff] cursor-pointer" />
                                <MdOutlineDelete onClick={() => handleDelete(booking.id)} className="text-[#f24949] cursor-pointer" />
                            </div>
                        </div>
                    </div>
                ))}
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
                                 onClick={handleUpdateBooking}
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

export default BokkingCard;
