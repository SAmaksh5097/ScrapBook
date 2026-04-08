import { useState, useEffect, useCallback } from 'react'
import MemoryCard from '../components/MemoryCard'
import AddMemoryForm from '../components/AddMemoryForm'
import { Link, useParams } from 'react-router-dom'

const Yearpage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [memories, setMemories] = useState([])
  const { year } = useParams()

  const fetchMemories = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/memories/1234/${year}`)

      if (!response.ok) {
        throw new Error('Failed to fetch memories')
      }

      const data = await response.json()
      setMemories(data)
    } catch (error) {
      console.error('Failed to fetch memories:', error)
    }
  }, [year])

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  const handleAddMemory = async () => {
    await fetchMemories()
    setIsFormOpen(false)
  }

  return (
    <div className='min-h-screen h-fit flex flex-col gap-5  bg-black text-white py-10 px-4 md:px-10'>
      <div className='flex justify-between'>
        <h1 className='text-4xl'>{year} Archive</h1>
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
        {memories.map((memory) => (
          <MemoryCard key={memory.memory_id} title={memory.title} imageUrl={memory.cover_img_url} date={memory.date} cardIndex={memory.memory_id}/>
        ))}
      </div>
    </div>
  )
}

export default Yearpage
