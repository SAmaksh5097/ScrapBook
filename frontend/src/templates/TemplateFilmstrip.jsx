import React, { useState } from 'react'

const TemplateFilmstrip = ({ entry }) => {
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
    <article className='w-full max-w-5xl rounded-3xl border border-zinc-300 bg-zinc-100 p-6 shadow-sm'>
      <div className='rounded-2xl border border-zinc-800 bg-zinc-900 p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-3xl font-bold text-zinc-100'>{entry.title}</h3>
          <span className='rounded-full bg-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-100'>{entry.month}</span>
        </div>

        <div className='grid gap-3 md:grid-cols-[120px_1fr]'>
          <div className='grid grid-cols-3 gap-2 md:grid-cols-1'>
            {slides.map((image, index) => (
              <button
                type='button'
                key={`${image.imageFile}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-md border ${index === activeIndex ? 'border-amber-300' : 'border-zinc-700'}`}
                aria-label={`Go to image ${index + 1}`}
              >
                <img src={image.imageFile} alt={image.title || entry.title} className='h-16 w-full object-cover md:h-20' />
              </button>
            ))}
          </div>

          <div className='rounded-xl border border-zinc-700 bg-zinc-800 p-3'>
            <img src={current.imageFile} alt={current.title || entry.title} className='h-72 w-full rounded-lg object-cover' />
            <p className='pt-3 text-sm text-zinc-200'>{current.desc || 'No description provided.'}</p>
            <p className='pt-2 text-sm text-zinc-300'>{entry.desc}</p>
            {entry.location && <p className='pt-1 text-sm text-zinc-300'>Location: {entry.location}</p>}
          </div>
        </div>

        <div className='mt-4 flex items-center justify-end'>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full bg-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-100 hover:bg-zinc-600'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full bg-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-100 hover:bg-zinc-600'
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

export default TemplateFilmstrip
