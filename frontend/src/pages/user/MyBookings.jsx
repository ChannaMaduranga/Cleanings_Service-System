import React from 'react'
import BokkingCard from './BokkingCard'

function MyBookings() {
  return (
    <div>
        <h1 className='justify-center flex text-4xl font-semibold my-8'>My Bookings</h1>
        <div className="flex justify-center flex-wrap gap-6 px-16 py-4 overflow-y-scroll scrollbar-hide ">
            <BokkingCard/>
            <BokkingCard/>
            <BokkingCard/>
            <BokkingCard/>
            <BokkingCard/>
            <BokkingCard/>
        </div>
    </div>
  )
}

export default MyBookings