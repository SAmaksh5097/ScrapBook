import React, { useState } from 'react'
import { motion as Motion } from 'motion/react'

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

  const hasMultipleSlides = slides.length > 1
  const previous = slides[(activeIndex - 1 + slides.length) % slides.length]
  const current = slides[activeIndex]
  const next = slides[(activeIndex + 1) % slides.length]

  const displaySlides = slides.length >= 3
    ? [previous, current, next]
    : slides.length === 2
      ? [current, next]
      : [current]

  const showPrevious = () => {
    if (!hasMultipleSlides) {
      return
    }

    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    if (!hasMultipleSlides) {
      return
    }

    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <Motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-sm'
    >
      <div className='space-y-6'>
        <div className='space-y-1 text-center'>
          <h3 className='text-5xl font-bold text-zinc-100'>{entry.title}</h3>
          <p className='text-xl font-semibold italic text-zinc-300'>{entry.month}</p>
        </div>

        <div className={`grid gap-4 ${displaySlides.length === 3 ? 'sm:grid-cols-3' : displaySlides.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}>
          {displaySlides.map((image, index) => (
            <Motion.div
              key={`${image.imageFile}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.04, ease: 'easeOut' }}
              className={`rounded-sm border border-white/10 bg-zinc-800/80 p-3 shadow-xl ${displaySlides.length === 3 ? (index === 1 ? 'sm:-translate-y-2' : 'sm:translate-y-2') : ''}`}
            >
              <Motion.img
                key={`${image.imageFile}-${activeIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                src={image.imageFile}
                alt={image.title || entry.title}
                className='h-48 w-full object-cover'
              />
              <p className='pt-2 text-center text-sm italic text-zinc-300'>
                {image.desc || 'No description provided.'}
              </p>
            </Motion.div>
          ))}
        </div>

        <div className='flex flex-wrap items-center justify-between gap-3'>
          <p className='max-w-2xl text-lg text-zinc-300'>{entry.desc}</p>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              disabled={!hasMultipleSlides}
              className={`rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 text-sm font-semibold text-zinc-100 transition ${hasMultipleSlides ? 'hover:bg-zinc-700/90' : 'cursor-not-allowed opacity-50'}`}
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              disabled={!hasMultipleSlides}
              className={`rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 text-sm font-semibold text-zinc-100 transition ${hasMultipleSlides ? 'hover:bg-zinc-700/90' : 'cursor-not-allowed opacity-50'}`}
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        {entry.location && (
          <div className='grid gap-2 text-sm text-zinc-400 sm:grid-cols-2'>
            <p><span className='font-semibold'>Location:</span> {entry.location}</p>
          </div>
        )}
      </div>
    </Motion.article>
  )
}

export default TemplateTimeline