import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { addMemory } from '../services/api/memoryApi'

const AddMemoryForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [location, setLocation] = useState('')
  const { year } = useParams()

  const user_id = 1234; // will change it later to dynamic value based on logged in user

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title.trim() || !date) {
      return
    }

    try{
      await addMemory(user_id, title, date, imageUrl, location, desc)
    } catch (err){
      console.error('Error adding memory:', err);
    }


    if (onSubmit) {
      onSubmit({
        title: title.trim(),
        date: date,
        imageFile: null,
        imageUrl: imageUrl.trim(),
        desc: desc.trim(),
        location: location.trim()
      });
    }

    setTitle('')
    setDate('')
    setImageUrl('')
    setDesc('')
    setLocation('')

  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className='w-full max-w-xl rounded-xl border border-white/20 bg-zinc-900/90 p-4 text-white shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto sm:p-6'
    >
      <h1 className='text-xl sm:text-2xl font-semibold tracking-wide'>New Memory</h1>
      <p className='mt-1 text-xs sm:text-sm text-zinc-300'>Fill in the details to add your memory.</p>

      <form className='mt-5 space-y-3 sm:space-y-4' onSubmit={handleSubmit}>
        <div className='space-y-1'>
          <label htmlFor='title' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Title <span className='text-rose-300'>*</span>
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
            placeholder='A name for this memory'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='date' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Month & Year <span className='text-rose-300'>*</span>
          </label>
          <input
            type='month'
            id='date'
            name='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            min={year ? `${year}-01` : undefined}
            max={year ? `${year}-12` : undefined}
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='imageUrl' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Cover Image URL
          </label>
          <input
            type='url'
            id='imageUrl'
            name='imageUrl'
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
            placeholder='https://example.com/cover.jpg'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='location' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Location (optional)
          </label>
          <textarea
            id='location'
            name='location'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            rows={2}
            className='w-full resize-none rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
          ></textarea>
        </div>

        <div className='space-y-1'>
          <label htmlFor='desc' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Description (optional)
          </label>
          <textarea
            id='desc'
            name='desc'
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            rows={2}
            className='w-full resize-none rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
            placeholder='Add a quick note about this memory...'
          ></textarea>
        </div>

        <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-3 sm:pt-4'>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='w-full sm:w-auto rounded-md border border-zinc-600 px-4 py-2 text-xs sm:text-sm text-zinc-200 transition hover:bg-zinc-800'
            >
              Cancel
            </button>
          )}
          <button
            type='submit'
            className='w-full sm:w-auto rounded-md bg-amber-300 px-4 py-2 text-xs sm:text-sm font-semibold text-black transition hover:bg-amber-200'
          >
            Add Memory
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default AddMemoryForm
