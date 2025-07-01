import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-200 h-15 flex flex-col justify-center items-center  '>
        <div className=''>
            <p className='text-sm text-gray-600'>© 2024 Startup Evaluation Hub. All rights reserved.</p>
        </div>
        <div>
            <p className='text-sm text-gray-600'>If you have any issues, call <span className='text-sm text-blue-700 underline'> Support </span></p>
        </div>
    </div>
  )
}

export default Footer