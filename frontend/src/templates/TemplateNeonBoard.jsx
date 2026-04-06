import React, { useState } from 'react'

const TemplateNeonBoard = ({ entry }) => {
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
      <div className='grid gap-5 md:grid-cols-[1.2fr_1fr]'>
        <div className='space-y-4'>
          <h3 className='text-4xl font-bold text-zinc-800'>{entry.title}</h3>
          <p className='text-zinc-700'>{entry.desc}</p>
          <p className='text-sm text-zinc-700'>{entry.month}</p>
          {entry.location && <p className='text-sm text-zinc-700'>Location: {entry.location}</p>}

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-zinc-800 hover:bg-white'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-zinc-800 hover:bg-white'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        <div className='rounded-2xl border border-zinc-300 bg-white/70 p-3'>
          <img src={current.imageFile} alt={current.title || entry.title} className='h-64 w-full rounded-xl object-cover' />
          <p className='pt-3 text-sm text-zinc-700'>{current.desc || 'No description provided.'}</p>
        </div>
      </div>
    </article>
  )
}

export default TemplateNeonBoard
