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
    <article className='w-full max-w-5xl overflow-hidden rounded-3xl border border-teal-200/60 bg-linear-to-r from-teal-100/70 via-teal-50 to-teal-900/35 p-6 shadow-sm'>
      <div className='space-y-6'>
        <div className='space-y-1 text-center'>
          <h3 className='text-5xl font-bold text-amber-700'>{entry.title}</h3>
          <p className='text-xl font-semibold italic text-amber-900/70'>{entry.month}</p>
        </div>

        <div className='grid gap-4 sm:grid-cols-3'>
          {[previous, current, next].map((image, index) => (
            <div
              key={`${image.imageFile}-${index}`}
              className={`rounded-sm bg-white p-3 shadow-xl ${index === 1 ? 'sm:-translate-y-2' : 'sm:translate-y-2'}`}
            >
              <img src={image.imageFile} alt={image.title || entry.title} className='h-48 w-full object-cover' />
              <p className='pt-2 text-center text-sm italic text-slate-600'>
                {image.desc || 'No description provided.'}
              </p>
            </div>
          ))}
        </div>

        <div className='flex flex-wrap items-center justify-between gap-3'>
          <p className='max-w-2xl text-lg text-teal-950'>{entry.desc}</p>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full bg-teal-900 px-3 py-1 text-sm font-semibold text-white transition hover:bg-teal-800'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full bg-teal-900 px-3 py-1 text-sm font-semibold text-white transition hover:bg-teal-800'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        {entry.location && (
          <div className='grid gap-2 text-sm text-teal-900 sm:grid-cols-2'>
            <p><span className='font-semibold'>Location:</span> {entry.location}</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default TemplateTimeline