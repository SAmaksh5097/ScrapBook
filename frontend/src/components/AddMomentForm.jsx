import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { addMoment } from '../services/api/momentApi'

const AddMomentForm = ({onSubmit,onCancel }) => {
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [desc, setDesc] = useState('')

  const { memoryId } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault()


    const trimmedImageUrl = imageUrl.trim()

    if (!title.trim() || !day || !trimmedImageUrl) {
      return
    }

    try{
      await addMoment(memoryId, title, day, trimmedImageUrl, desc)

      if (onSubmit) {
        await onSubmit()
      }

      if (onCancel) {
        onCancel()
      }
      
    } catch(err){
      console.error('Error adding moment:', err);
    }

    setTitle('')
    setDay('')
    setImageUrl('')
    setDesc('')
  }

  return (
    <div className='w-full max-w-xl rounded-xl border border-white/20 bg-zinc-900/90 p-4 text-white shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto sm:p-6'>
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
            Add Moment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMomentForm
