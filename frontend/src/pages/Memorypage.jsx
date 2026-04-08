import { useState, useEffect, useCallback } from 'react'
import { Camera } from 'lucide-react'
import Momentcard from '../components/Momentcard'
import AddMomentForm from '../components/AddMomentForm'
import {useParams} from 'react-router-dom'
import { motion } from 'motion/react'
import { fetchMemoryDetails } from '../services/api/memoryApi'
import { fetchMoments } from '../services/api/momentApi'
const Memorypage = () => {
    const [moments, setMoments] = useState([])

    const [memoryDetails, setMemoryDetails] = useState(null)

    const { memoryId } = useParams();

    const loadMemoryPageData = useCallback(async () => {
      const [momentsData, detailsData] = await Promise.all([
        fetchMoments(memoryId),
        fetchMemoryDetails(memoryId)
      ])

      return {
        momentsData: momentsData || [],
        detailsData,
      }
    }, [memoryId])

    useEffect(() => {
      const loadData = async () => {
        try {
          const { momentsData, detailsData } = await loadMemoryPageData()
          setMoments(momentsData)
          setMemoryDetails(detailsData)
        } catch (err) {
          console.error('Error loading memory page data:', err)
        }
      }

      void loadData()
    }, [loadMemoryPageData])

    const refreshMoments = async () => {
      try {
        const data = await fetchMoments(memoryId)
        setMoments(data || [])
      } catch (err) {
        console.error('Error fetching moments:', err)
      }
    }


    const [showAddForm, setShowAddForm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='w-full bg-black text-white py-10 px-4 md:px-10 pb-20'
    >
        <div className='flex justify-between border-b border-white/30 pb-5 mb-5 items-center'>
            <div>
                <h1 className='text-3xl'>{memoryDetails ? memoryDetails.title : 'Memory Details'}</h1>
                <p className='text-sm text-white/70 '>{memoryDetails ? memoryDetails.description : ''}</p>
                <p className='text-sm text-white/90'>{memoryDetails ? new Date(memoryDetails.date).toLocaleDateString("en-US",{day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
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
          {moments.map((moment) => (
            <Momentcard key={moment.moment_id} title={moment.title} date={moment.date} img_url={moment.img_url} description={moment.description} cardIndex={moment.moment_id} onDeleteSuccess={refreshMoments} />
          ))}
        </div> 

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm'
          >
            <AddMomentForm onSubmit={refreshMoments} onCancel={() => setShowAddForm(false)} />
          </motion.div>
        )}


      
    </motion.div>
  )
}

export default Memorypage
