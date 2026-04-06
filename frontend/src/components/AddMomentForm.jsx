import { useState } from 'react'

const AddMomentForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('')
  const [month, setMonth] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [desc, setDesc] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim() || !month || !imageFile) {
      return
    }

    if (onSubmit) {
      onSubmit({
        title: title.trim(),
        month,
        imageFile,
        desc: desc.trim()
      })
    }

    setTitle('')
    setMonth('')
    setImageFile(null)
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
          <label htmlFor='month' className='text-sm font-medium text-zinc-100'>
            Month & Year <span className='text-rose-300'>*</span>
          </label>
          <input
            type='month'
            id='month'
            name='month'
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            required
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm outline-none transition focus:border-amber-400'
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='imageFile' className='text-sm font-medium text-zinc-100'>
            Image <span className='text-rose-300'>*</span>
          </label>
          <input
            type='file'
            id='imageFile'
            name='imageFile'
            accept='image/*'
            required
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            className='w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-amber-300 file:px-3 file:py-1 file:text-sm file:font-medium file:text-black hover:file:bg-amber-200'
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
