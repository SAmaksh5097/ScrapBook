import { useState, useEffect, useCallback } from 'react'
import { Camera } from 'lucide-react'
import Momentcard from '../components/Momentcard'
import AddMomentForm from '../components/AddMomentForm'
import {useParams} from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import { fetchMemoryDetails } from '../services/api/memoryApi'
import { fetchMoments } from '../services/api/momentApi'
import { useAuth } from '@clerk/react'
const Memorypage = () => {
    const [moments, setMoments] = useState([])

  const { isLoaded, userId, getToken } = useAuth()

    const [memoryDetails, setMemoryDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

    const { memoryId } = useParams();

  const loadMemoryPageData = useCallback(async () => {
      if (!userId) {
        return {
          momentsData: [],
          detailsData: null,
        }
      }

      const [momentsData, detailsData] = await Promise.all([
        fetchMoments(userId, memoryId, getToken),
        fetchMemoryDetails(memoryId, getToken)
      ])

      return {
        momentsData: momentsData || [],
        detailsData,
      }
    }, [memoryId, userId, getToken])

    useEffect(() => {
      const loadData = async () => {
        if (!isLoaded) {
          return
        }

        setIsLoading(true)
        try {
          const { momentsData, detailsData } = await loadMemoryPageData()
          setMoments(momentsData)
          setMemoryDetails(detailsData)
        } catch (err) {
          console.error('Error loading memory page data:', err)
        } finally {
          setIsLoading(false)
        }
      }

      void loadData()
    }, [isLoaded, loadMemoryPageData])

    const refreshMoments = async () => {
      if (!userId) {
        return
      }

      setIsLoading(true)
      try {
        const data = await fetchMoments(userId, memoryId, getToken)
        setMoments(data || [])
      } catch (err) {
        console.error('Error fetching moments:', err)
      } finally {
        setIsLoading(false)
      }
    }


    const [showAddForm, setShowAddForm] = useState(false)

  return (
    <Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='w-full bg-black text-white py-10 px-4 md:px-10 pb-20'
    >
        <div className='flex justify-between border-b border-white/30 pb-5 mb-5 items-center'>
            <div>
                {isLoading ? (
                  <div className='space-y-2 animate-pulse'>
                    <div className='h-8 w-52 rounded bg-white/15'></div>
                    <div className='h-4 w-72 rounded bg-white/10'></div>
                    <div className='h-4 w-40 rounded bg-white/10'></div>
                  </div>
                ) : (
                  <>
                    <h1 className='text-3xl'>{memoryDetails ? memoryDetails.title : 'Memory Details'}</h1>
                    <p className='text-sm text-white/70 '>{memoryDetails ? memoryDetails.description : ''}</p>
                    <p className='text-sm text-white/90'>{memoryDetails ? new Date(memoryDetails.date).toLocaleDateString("en-US",{month: 'long', year: 'numeric'}) : ''}</p>
                  </>
                )}
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className='flex gap-2 border p-1 rounded-sm h-fit bg-white text-black cursor-pointer hover:bg-gray-300 items-center transition '
            >
                <Camera/>
                <h1>Add Photo</h1>
            </button>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`moment-skeleton-${index}`}
                className='group relative mx-auto flex h-full w-full max-w-sm flex-col gap-3  bg-zinc-900/70 p-3 shadow-[0_8px_20px_rgba(0,0,0,0.3)] animate-pulse'
              >
                <div className='h-40 w-full bg-zinc-800'></div>
                <div className='space-y-2 px-1 pt-1'>
                  <div className='h-4 w-2/3 rounded bg-zinc-700'></div>
                  <div className='h-3 w-1/3 rounded bg-zinc-700'></div>
                </div>
                <div className='border-t border-zinc-700 pt-2 px-1'>
                  <div className='h-3 w-full rounded bg-zinc-700'></div>
                </div>
              </div>
            ))
            : moments.map((moment) => (
              <Momentcard key={moment.moment_id} title={moment.title} date={moment.date} img_url={moment.img_url} description={moment.description} cardIndex={moment.moment_id} onDeleteSuccess={refreshMoments} />
            ))}
        </div> 

        {showAddForm && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm'
          >
            <AddMomentForm onSubmit={refreshMoments} onCancel={() => setShowAddForm(false)} />
          </Motion.div>
        )}


      
    </Motion.div>
  )
}

export default Memorypage
