import { useState } from 'react'
import MemoryCard from '../components/MemoryCard'
import AddMemoryForm from '../components/AddMemoryForm'
import { Link } from 'react-router-dom'
const Yearpage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [memories, setMemories] = useState([
    { id: 1, title: 'Road Trip', date: 'June 2024' },
    { id: 2, title: 'Beach Vacation', date: 'July 2024' },
    { id: 3, title: 'Mountain Hike', date: 'August 2024' },
    { id: 4, title: 'City Exploration', date: 'September 2024' },
  ])

  const formatMonthYear = (value) => {
    if (!value) return ''

    const [year, month] = value.split('-')
    if (!year || !month) return value

    const date = new Date(Number(year), Number(month) - 1, 1)
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  const handleAddMemory = (newMemory) => {
    setMemories((prevMemories) => [
      {
        id: Date.now(),
        title: newMemory.title,
        date: formatMonthYear(newMemory.month)
      },
      ...prevMemories
    ])

    setIsFormOpen(false)
  }

  return (
    <div className='min-h-screen h-fit flex flex-col gap-5  bg-black text-white py-10 px-4 md:px-10'>
      <div className='flex justify-between'>
        <h1 className='text-4xl'>2024 Archive</h1>
        <div className='flex gap-2'>
          <button
            onClick={() => setIsFormOpen(true)}
            className='border bg-black text-white p-2 rounded-sm cursor-pointer hover:bg-white hover:text-black'
          >
            Add memory
          </button>
          <Link to={'/yearbook'}>
            <button className='border bg-white text-black p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
              View Yearbook
            </button>
          </Link>
        </div>
      </div>

      {isFormOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
          <AddMemoryForm onSubmit={handleAddMemory} onCancel={() => setIsFormOpen(false)} />
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {memories.map((trip) => (
          <MemoryCard key={trip.id} title={trip.title} date={trip.date} cardIndex={trip.id} />
        ))}
      </div>
    </div>
  )
}

export default Yearpage
