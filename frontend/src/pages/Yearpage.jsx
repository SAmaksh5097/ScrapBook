import { useState, useEffect, useCallback } from 'react'
import MemoryCard from '../components/MemoryCard'
import AddMemoryForm from '../components/AddMemoryForm'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import { fetchMemories } from '../services/api/memoryApi'
import LoginRequest from '../components/LoginRequest'
import { useAuth } from '@clerk/react'
const Yearpage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [memories, setMemories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { year } = useParams()
  const isValidYear = /^\d{4}$/.test(year);
  if (!isValidYear) {
    return <Navigate to="/404" />
  }
  const { userId, getToken } = useAuth()
  // const userId = 1234; // in future, get this from auth context

  const fetchMemoriesData = useCallback(async () => {
    return fetchMemories(userId, year, getToken)
  }, [userId, year, getToken])

  useEffect(() => {
      let isActive = true

      const loadMemories = async () => {
        setIsLoading(true)
        try {
          const data = await fetchMemoriesData()
          if (isActive) {
            setMemories(data || [])
          }
        } catch (error) {
          console.error('Failed to fetch memories:', error)
        } finally {
          if (isActive) {
            setIsLoading(false)
          }
        }
      }

      loadMemories()

      return () => {
        isActive = false
      }
    }, [fetchMemoriesData])

  const handleAddMemory = async () => {
      setIsLoading(true)
      try {
        const data = await fetchMemoriesData()
        setMemories(data || [])
      } catch (error) {
        console.error('Failed to fetch memories:', error)
      } finally {
        setIsLoading(false)
      }
    setIsFormOpen(false)
  }

  const handleDeleteMemory = async (memoryId) => {
    // Confirmation already done in MemoryCard, just refetch the list
    try {
      const data = await fetchMemoriesData()
      setMemories(data || [])
    } catch (error) {
      console.error('Failed to refetch memories after deletion:', error)
    }
  }

  return (
    <>
      {userId?(
      <Motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className='w-full flex flex-col gap-5 bg-black text-white py-10 px-4 md:px-10 pb-20'
      >
        <div className='flex justify-between'>
          <h1 className='text-4xl'>{year} Archive</h1>
          <div className='flex gap-2'>
            <button
              onClick={() => setIsFormOpen(true)}
              className='border bg-black text-white p-2 rounded-sm cursor-pointer hover:bg-white hover:text-black'
            >
              Add memory
            </button>
            <Link to={`/dashboard/${year}/yearbook`}>
              <button className='border bg-white text-black p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                View Yearbook
              </button>
            </Link>
          </div>
        </div>

        {isFormOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
          >
            <AddMemoryForm onSubmit={handleAddMemory} onCancel={() => setIsFormOpen(false)} />
          </Motion.div>
        )}

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`memory-skeleton-${index}`}
                className='group relative mx-auto flex h-full w-full max-w-sm flex-col gap-3 bg-zinc-900/70 p-3 shadow-[0_8px_20px_rgba(0,0,0,0.3)] animate-pulse'
              >
                <div className='h-40 w-full border border-zinc-700 bg-zinc-800'></div>
                <div className='space-y-2 px-1 pt-1'>
                  <div className='h-4 w-2/3 rounded bg-zinc-700'></div>
                  <div className='h-3 w-1/3 rounded bg-zinc-700'></div>
                </div>
                <div className='mt-auto flex justify-end gap-4 px-1'>
                  <div className='h-4 w-4 rounded bg-zinc-700'></div>
                  <div className='h-4 w-4 rounded bg-zinc-700'></div>
                </div>
              </div>
            ))
            : memories.map((memory) => (
              <MemoryCard
                key={memory.memory_id}
                title={memory.title}
                imageUrl={memory.cover_img_url}
                date={memory.date}
                cardIndex={memory.memory_id}
                memoryId={memory.memory_id}
                onDelete={handleDeleteMemory}
              />
            ))}
        </div>
      </Motion.div>
      ):(
        <LoginRequest/>
      )}
    
    </>
  )
}

export default Yearpage
