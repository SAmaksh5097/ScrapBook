import React from 'react'
import { Camera } from 'lucide-react'
import Momentcard from '../components/Momentcard'
const Memorypage = () => {
    const moments = [
        { id: 1, title: 'Beach Day', date: 'June 15, 2024', imageUrl: 'https://example.com/beach.jpg', desc: 'Enjoying the sun and waves at the beach.' },
        { id: 2, title: 'Mountain Hike', date: 'July 10, 2024', imageUrl: 'https://example.com/mountain.jpg', desc: 'Hiking up the scenic mountain trails.' },
        { id: 3, title: 'City Exploration', date: 'August 5, 2024', imageUrl: 'https://example.com/city.jpg', desc: 'Discovering hidden gems in the city.' },
        { id: 4, title: 'Road Trip', date: 'September 20, 2024', imageUrl: 'https://example.com/roadtrip.jpg', desc: 'Driving through picturesque landscapes.' },
      ]
  return (
    <div className='bg-black text-white min-h-screen h-fit py-10 px-4 md:px-10'>
        <div className='flex justify-between border-b border-white/30 pb-5 mb-5 items-center'>
            <div>
                <h1 className='text-3xl'>Summer 2024 Roadtrip</h1>
                <p className='text-sm text-white/70 w-[50%] '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid reprehenderit labore repellat, quidem eum harum!</p>
                <p className='text-sm text-white/90'>June 2024</p>
            </div>
            <button className='flex gap-2 border p-1 rounded-sm h-fit bg-white text-black cursor-pointer hover:bg-gray-300 items-center transition '>
                <Camera/>
                <h1>Add Photo</h1>
            </button>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {moments.map((moment) => (
            <Momentcard key={moment.id} title={moment.title} date={moment.date} imageUrl={moment.imageUrl} desc={moment.desc} cardIndex={moment.id} />
          ))}
        </div> 


      
    </div>
  )
}

export default Memorypage
