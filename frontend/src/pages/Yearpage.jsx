import React from 'react'
import MemoryCard from '../components/MemoryCard'
const Yearpage = () => {
    const memories= [
    { id: 1, title: 'Road Trip', date: 'June 2024' },
    { id: 2, title: 'Beach Vacation', date: 'July 2024' },
    { id: 3, title: 'Mountain Hike', date: 'August 2024' },
    { id: 4, title: 'City Exploration', date: 'September 2024' },
  ]
  return (
    <div className='min-h-screen h-fit flex flex-col gap-5  bg-black text-white py-10 px-4 md:px-10'>
        <div className='flex justify-between'>
            <h1 className='text-4xl'>2024 Archive</h1>
            <div className='flex gap-2'>
              <button className='border bg-black text-white p-2 rounded-sm cursor-pointer hover:bg-white hover:text-black'>Add memory</button>
              <button className='border bg-white text-black p-2 rounded-sm cursor-pointer hover:bg-gray-300'>View Yearbook</button>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {memories.map((trip) => (
            <MemoryCard key={trip.id} title={trip.title} date={trip.date} cardIndex={trip.id} />
          ))}
        </div>  
    </div>
  )
}

export default Yearpage
