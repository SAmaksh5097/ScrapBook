import { useState, useEffect, useCallback } from 'react'
import DashboardCard from '../components/DashboardCard'
import AddMemoryForm from '../components/AddMemoryForm'
import { Plus } from 'lucide-react'
import { motion as Motion } from 'motion/react'
import { fetchYears } from '../services/api/memoryApi'
const Dashboard = () => {
  const[years,setYears] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const userId = 1234; // in future, get this from auth context 

  const fetchYearsData = useCallback(async () => {
    return fetchYears(userId)
  }, [userId]);

  useEffect(() => {
    let isActive = true

    const loadYears = async () => {
      setIsLoading(true)
      try {
        const data = await fetchYearsData()
        if (isActive) {
          setYears(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error('Error fetching years:', err)
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadYears()

    return () => {
      isActive = false
    }
  }, [fetchYearsData]);

  const handleAddMemory = async () => {
    setIsLoading(true)
    try {
      const data = await fetchYearsData()
      setYears(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching years:', err)
    } finally {
      setIsLoading(false)
    }
    setIsFormOpen(false);
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='w-full bg-black text-white py-10 px-4 md:px-10 pb-20'
    >
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mb-8 flex  items-center justify-between'>
          <h1 className='text-2xl font-semibold tracking-wide md:text-4xl'>My Scrapbook Memories</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className='flex gap-2 border p-2 rounded bg-white text-black cursor-pointer hover:bg-gray-300 items-center transition '
          >
            <Plus/>
            Add memory</button>
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
                key={`year-skeleton-${index}`}
                className='h-52 w-full max-w-sm mx-auto rounded-4xl border border-white/10 bg-zinc-900/70 p-4 animate-pulse'
              >
                <div className='h-full rounded-3xl border border-white/10 bg-white/5 p-4 flex flex-col justify-end'>
                  <div className='h-10 w-28 rounded bg-white/10'></div>
                  <div className='mt-5 flex items-center justify-between'>
                    <div className='h-3 w-20 rounded bg-white/10'></div>
                    <div className='h-11 w-11 rounded-full bg-white/10'></div>
                  </div>
                </div>
              </div>
            ))
            : years.map((year) => (
              <DashboardCard key={year.year} title={`${year.year}`} cardIndex={year.year} year={year.year} />
            ))}
        </div>
      </div>
    </Motion.div>
  )
}

export default Dashboard
