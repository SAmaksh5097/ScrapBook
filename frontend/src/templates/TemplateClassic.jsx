import React, { useState } from 'react'

const TemplateClassic = ({ entry }) => {
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
  const next = slides[(activeIndex + 1) % slides.length]

  const showPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <article className='w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-stone-100/95 p-6 shadow-sm'>
      <div className='grid gap-6 md:grid-cols-[1fr_360px] md:items-center'>
        <div className='space-y-3 text-left'>
          <span className='inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-700'>
            {entry.month}
          </span>
          <h3 className='max-w-xl text-5xl font-bold leading-[1.05] text-slate-700'>{entry.title}</h3>
          <p className='max-w-lg text-2xl leading-relaxed text-slate-600'>{entry.desc}</p>
          <p className='text-sm text-slate-600'>{current.desc || 'No description provided.'}</p>
          {entry.location && <p className='text-sm text-slate-600'>Location: {entry.location}</p>}

          <div className='flex items-center gap-3 pt-2'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full bg-slate-700 px-3 py-1 text-sm font-semibold text-white transition hover:bg-slate-600'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full bg-slate-700 px-3 py-1 text-sm font-semibold text-white transition hover:bg-slate-600'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        <div className='relative mx-auto h-75 w-full max-w-85'>
          <div className='absolute left-2 top-0 w-[58%] -rotate-2 rounded-sm bg-white p-3 shadow-lg'>
            <img src={current.imageFile} alt={current.title || entry.title} className='h-42.5 w-full object-cover' />
          </div>

          <div className='absolute right-0 top-20 w-[58%] rotate-3 rounded-sm bg-white p-3 shadow-lg'>
            <img src={next.imageFile} alt={next.title || entry.title} className='h-42.5 w-full object-cover' />
          </div>
        </div>
      </div>
    </article>
  )
}

export default TemplateClassic