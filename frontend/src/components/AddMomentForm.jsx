import { useState } from 'react'
import { useParams } from 'react-router-dom'

const AddMomentForm = ({onSubmit,onCancel }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [desc, setDesc] = useState('')

  const { memoryId } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault()


    const trimmedImageUrl = imageUrl.trim()

    if (!title.trim() || !date || !trimmedImageUrl) {
      return
    }

    try{
      const response = await fetch(`http://localhost:5000/api/moments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memory_id: memoryId,
          title: title.trim(),
          date,
          img_url: trimmedImageUrl,
          description: desc.trim()
        })
      }); 

      if (!response.ok) {
        throw new Error('Failed to add moment');
      }

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
    setDate('')
    setImageUrl('')
    setDesc('')
  }

  return (
    <div className='w-full max-w-lg rounded-xl border border-white/20 bg-zinc-900/90 p-6 text-white shadow-2xl backdrop-blur-sm'>
      <h1 className='text-2xl font-semibold tracking-wide'>New Moment</h1>
      <p className='mt-1 text-sm text-zinc-300'>Fill in the details to add your moment.</p>

      <form className='mt-5 space-y-4' onSubmit={handleSubmit}>
        <div className='space-y-1'>
          <label htmlFor='title' className='text-sm font-medium text-zinc-100'>
            Title <span className='text-rose-300'>*</span>
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm outline-none transition focus:border-amber-400'
            placeholder='A name for this moment'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='date' className='text-sm font-medium text-zinc-100'>
            Date <span className='text-rose-300'>*</span>
          </label>
          <input
            type='date'
            id='date'
            name='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm outline-none transition focus:border-amber-400'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='imageUrl' className='text-sm font-medium text-zinc-100'>
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
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm outline-none transition focus:border-amber-400'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='desc' className='text-sm font-medium text-zinc-100'>
            Description (optional)
          </label>
          <textarea
            id='desc'
            name='desc'
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            rows={3}
            className='w-full resize-none rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm outline-none transition focus:border-amber-400'
            placeholder='Add a quick note about this moment...'
          ></textarea>
        </div>

        <div className='flex items-center justify-end gap-2 pt-1'>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='rounded-md border border-zinc-600 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800'
            >
              Cancel
            </button>
          )}
          <button
            type='submit'
            className='rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-200'
          >
            Add Moment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMomentForm
