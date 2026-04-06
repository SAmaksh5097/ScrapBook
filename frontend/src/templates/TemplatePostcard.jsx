import React, { useState } from 'react'

const TemplatePostcard = ({ entry }) => {
  const coverSlide = entry.imageFile
    ? [{ title: entry.title, month: entry.month, imageFile: entry.imageFile, desc: entry.desc }]
    : []
  const momentSlides = (entry.moments || [])
    .filter((moment) => moment.imageFile)
    .map((moment) => ({
      title: moment.title,
      month: moment.month,
      imageFile: moment.imageFile,
      desc: moment.desc
    }))
  const slides = [...coverSlide, ...momentSlides]
  const [activeIndex, setActiveIndex] = useState(0)

  if (slides.length === 0) {
    return null
  }

  const current = slides[activeIndex]

  const showPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <article className='w-full max-w-5xl rounded-3xl border border-zinc-300 bg-[linear-gradient(to_top_right,rgb(183,224,255),rgb(255,245,205),rgb(255,207,179))] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.18)]'>
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-4'>
          <img src={current.imageFile} alt={current.title || entry.title} className='h-72 w-full rounded-xl object-cover' />
          <p className='text-sm italic text-zinc-700'>{current.desc || 'No description provided.'}</p>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-sm font-semibold text-zinc-800 hover:bg-white'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-sm font-semibold text-zinc-800 hover:bg-white'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        <div className='flex flex-col justify-between rounded-2xl border border-zinc-300 bg-white/65 p-5'>
          <div className='space-y-2'>
            <p className='text-xs font-semibold uppercase tracking-widest text-zinc-700'>{entry.month}</p>
            <h3 className='text-4xl font-bold text-zinc-800'>{entry.title}</h3>
            <p className='text-zinc-700'>{entry.desc}</p>
          </div>

          {entry.location && (
            <div className='space-y-1 text-sm text-zinc-700'>
              <p><span className='font-semibold'>Location:</span> {entry.location}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default TemplatePostcard
