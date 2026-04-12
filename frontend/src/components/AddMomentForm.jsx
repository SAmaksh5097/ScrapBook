import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import { addMoment } from '../services/api/momentApi'
import { useAuth } from '@clerk/react'
const AddMomentForm = ({onSubmit,onCancel }) => {
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { userId, getToken } = useAuth()

  const { memoryId } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!userId || !memoryId) {
      const errorMsg = 'Missing user or memory context.'
      setError(errorMsg)
      alert(`❌ ${errorMsg}\n\nPlease refresh and try again.`)
      return
    }

    const trimmedImageUrl = imageUrl.trim()

    if (!title.trim() || !day || !trimmedImageUrl) {
      return
    }

    setIsSubmitting(true)
    try{
      const token = await getToken();
      await addMoment(token, userId, memoryId, title, day, trimmedImageUrl, desc)

      setTitle('')
      setDay('')
      setImageUrl('')
      setDesc('')

      if (onSubmit) {
        await onSubmit()
      }

      if (onCancel) {
        onCancel()
      }
      
    } catch(err){
      const errorMsg = err.message || 'Failed to add moment. Please try again.'
      setError(errorMsg)
      console.error('Error adding moment:', err);
      alert(`❌ ${errorMsg}\n\nPlease try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className='w-full max-w-xl rounded-xl border border-white/20 bg-zinc-900/90 p-4 text-white shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto sm:p-6'
    >
      <h1 className='text-xl sm:text-2xl font-semibold tracking-wide'>New Moment</h1>
      <p className='mt-1 text-xs sm:text-sm text-zinc-300'>Fill in the details to add your moment.</p>

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
            placeholder='A name for this moment'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='date' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Day <span className='text-rose-300'>*</span>
          </label>
          <input
            type='number'
            id='date'
            name='date'
            value={day}
            onChange={(event) => setDay(event.target.value)}
            required
            min='1'
            max='31'
            placeholder='Enter day (1-31)'
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='imageUrl' className='text-xs sm:text-sm font-medium text-zinc-100'>
            Image <span className='text-rose-300'>*</span>
          </label>

          <input
            type='url'
            id='imageUrl'
            name='imageUrl'
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            required
            placeholder='https://example.com/image.jpg'
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-xs sm:text-sm outline-none transition focus:border-amber-400'
          />
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
            placeholder='Add a quick note about this moment...'
          ></textarea>
        </div>

        {error && (
          <div className='rounded-md bg-red-900/30 border border-red-600/50 p-3 text-xs sm:text-sm text-red-300'>
            <p className='font-semibold'>⚠️ Error: {error}</p>
            <p className='mt-1 text-red-300/80'>Please check your input and try again.</p>
          </div>
        )}

        <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-3 sm:pt-4'>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              disabled={isSubmitting}
              className='w-full sm:w-auto rounded-md border border-zinc-600 px-4 py-2 text-xs sm:text-sm text-zinc-200 transition hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
          )}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full sm:w-auto rounded-md bg-amber-300 px-4 py-2 text-xs sm:text-sm font-semibold text-black transition hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {isSubmitting ? (
              <>
                <span className='h-3 w-3 rounded-full border-2 border-black/30 border-t-black animate-spin'></span>
                Adding...
              </>
            ) : (
              'Add Moment'
            )}
          </button>
        </div>
      </form>
    </Motion.div>
  )
}

export default AddMomentForm
