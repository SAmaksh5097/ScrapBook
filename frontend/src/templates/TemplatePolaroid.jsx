import React, { useState } from 'react'

const TemplatePolaroid = ({ entry }) => {
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
    <article className='w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-300 bg-[linear-gradient(to_top_right,rgb(183,224,255),rgb(255,245,205),rgb(255,207,179))] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.18)]'>
      <div className='grid gap-6 md:grid-cols-[340px_1fr] md:items-center'>
        <div className='relative mx-auto h-65 w-full max-w-85'>
          <div className='absolute left-0 top-7 w-[45%] -rotate-2 rounded-xl border border-zinc-300 bg-white p-2 shadow-lg'>
            <img src={current.imageFile} alt={current.title || entry.title} className='h-45 w-full rounded-lg object-cover' />
          </div>

          <div className='absolute right-2 top-0 w-[53%] rotate-2 rounded-xl border border-zinc-300 bg-white p-2 shadow-lg'>
            <img src={next.imageFile} alt={next.title || entry.title} className='h-52.5 w-full rounded-lg object-cover' />
          </div>
        </div>

        <div className='space-y-3 text-left'>
          <h3 className='text-4xl font-bold leading-tight text-zinc-800'>{entry.title}</h3>
          <p className='text-lg font-semibold text-zinc-700'>{entry.month}</p>
          <p className='max-w-xl text-xl leading-relaxed text-zinc-700'>{entry.desc}</p>
          <p className='text-sm text-zinc-700'>{current.desc || 'No description provided.'}</p>
          {entry.location && <p className='text-sm text-zinc-700'>Location: {entry.location}</p>}

          <div className='flex items-center gap-3 pt-2'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-sm font-semibold text-zinc-800 transition hover:bg-white'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-sm font-semibold text-zinc-800 transition hover:bg-white'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default TemplatePolaroid