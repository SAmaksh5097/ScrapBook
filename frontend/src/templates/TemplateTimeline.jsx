import React, { useState } from 'react'

const TemplateTimeline = ({ entry }) => {
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

  const previous = slides[(activeIndex - 1 + slides.length) % slides.length]
  const current = slides[activeIndex]
  const next = slides[(activeIndex + 1) % slides.length]

  const showPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <article className='w-full max-w-5xl overflow-hidden rounded-3xl border border-zinc-300 bg-[linear-gradient(to_right,rgb(183,224,255),rgb(255,245,205),rgb(255,207,179))] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.18)]'>
      <div className='space-y-6'>
        <div className='space-y-1 text-center'>
          <h3 className='text-5xl font-bold text-zinc-800'>{entry.title}</h3>
          <p className='text-xl font-semibold italic text-zinc-700'>{entry.month}</p>
        </div>

        <div className='grid gap-4 sm:grid-cols-3'>
          {[previous, current, next].map((image, index) => (
            <div
              key={`${image.imageFile}-${index}`}
              className={`rounded-sm border border-zinc-300 bg-white p-3 shadow-xl ${index === 1 ? 'sm:-translate-y-2' : 'sm:translate-y-2'}`}
            >
              <img src={image.imageFile} alt={image.title || entry.title} className='h-48 w-full object-cover' />
              <p className='pt-2 text-center text-sm italic text-zinc-700'>
                {image.desc || 'No description provided.'}
              </p>
            </div>
          ))}
        </div>

        <div className='flex flex-wrap items-center justify-between gap-3'>
          <p className='max-w-2xl text-lg text-zinc-800'>{entry.desc}</p>

          <div className='flex items-center gap-3'>
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

        {entry.location && (
          <div className='grid gap-2 text-sm text-zinc-700 sm:grid-cols-2'>
            <p><span className='font-semibold'>Location:</span> {entry.location}</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default TemplateTimeline