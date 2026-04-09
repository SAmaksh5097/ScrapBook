import { PencilIcon, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAuth } from '@clerk/react'
import { deleteMemory } from '../services/api/memoryApi'
const MemoryCard = ({ title, imageUrl, cardIndex, date, memoryId, onDelete }) => {
  const tiltStyles = ['rotate-[-1.5deg]', 'rotate-[1deg]', 'rotate-[-0.75deg]', 'rotate-[1.5deg]']
  const tiltClass = tiltStyles[cardIndex % tiltStyles.length]

  const year = new Date(date).getFullYear();

  const { getToken } = useAuth();

  const handleDelete = async ()=>{
    if(!window.confirm('Are you sure you want to delete this memory and all associated moments? This action cannot be undone.')){
      return;
    }
    try{
      const token = await getToken();
      await deleteMemory(memoryId, token)
      // Notify parent component to refetch list
      if(onDelete){
        onDelete(memoryId)
      }
    } catch(err){
      console.error('Error deleting memory:', err)
      alert('Failed to delete memory. Please try again.')
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: (cardIndex % 8) * 0.02 }}
      viewport={{ once: true }}
      className={`group relative mx-auto flex h-full w-full max-w-sm cursor-default flex-col gap-3 border border-zinc-300 bg-[linear-gradient(to_top_right,rgb(183,224,255),rgb(255,245,205),rgb(255,207,179))]  p-3 text-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-2  hover:shadow-[0_14px_26px_rgba(0,0,0,0.4)] ${tiltClass}`}
    >
        <div className='absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-zinc-200 bg-rose-500 shadow-[0_1px_4px_rgba(0,0,0,0.4)]'>
        </div>

        <div className='overflow-hidden border border-zinc-300 bg-white p-1'>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className='h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]'
              />
            ) : (
              <div className='h-40 w-full bg-gray-200'></div>
            )}
        </div>

        <div className='space-y-1 px-1 pt-1'>
            <h1 className='text-base font-semibold leading-tight'>{title}</h1>
            <p className='text-sm text-zinc-600'>{new Date(date).toLocaleDateString("en-US",{month:"short", year:"numeric"})}</p>
        </div>

        <div className='mt-auto flex justify-end px-1 gap-4 text-zinc-700 transition duration-300 group-hover:translate-x-1 group-hover:text-black'>
            <button
              type='button'
              onClick={handleDelete}
              className='cursor-pointer hover:text-red-600'
              aria-label='Delete memory'
            >
              <Trash size={18}/>
            </button>
            <Link to={`/dashboard/${year}/${cardIndex}`}>
                <PencilIcon size={18} />
            </Link>
        </div>
    </motion.article>
  )
}

export default MemoryCard
