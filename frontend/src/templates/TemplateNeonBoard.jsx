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
    <article className='w-full max-w-5xl rounded-3xl border border-cyan-300/50 bg-slate-950 p-6 shadow-2xl'>
      <div className='grid gap-5 md:grid-cols-[1.2fr_1fr]'>
        <div className='space-y-4'>
          <h3 className='text-4xl font-bold text-cyan-200'>{entry.title}</h3>
          <p className='text-cyan-100/80'>{entry.desc}</p>
          <p className='text-sm text-cyan-300'>{entry.month}</p>
          {entry.location && <p className='text-sm text-cyan-300'>Location: {entry.location}</p>}

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full border border-cyan-300/60 px-3 py-1 text-cyan-100 hover:bg-cyan-400/15'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full border border-cyan-300/60 px-3 py-1 text-cyan-100 hover:bg-cyan-400/15'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        <div className='rounded-2xl border border-cyan-300/40 bg-slate-900 p-3'>
          <img src={current.imageFile} alt={current.title || entry.title} className='h-64 w-full rounded-xl object-cover' />
          <p className='pt-3 text-sm text-cyan-100/80'>{current.desc || 'No description provided.'}</p>
        </div>
      </div>
    </article>
  )
}

export default TemplateNeonBoard
