import React, { useState } from 'react'
import { motion as Motion } from 'motion/react'

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
  const next = slides.length > 1 ? slides[(activeIndex + 1) % slides.length] : null

  const hasMultipleSlides = slides.length > 1

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
      <div className='grid gap-6 md:grid-cols-[340px_1fr] md:items-center'>
        <div className='relative mx-auto h-65 w-full max-w-85'>
          <div className='absolute left-0 top-7 w-[45%] -rotate-2 rounded-xl border border-white/10 bg-zinc-800/80 p-2 shadow-lg'>
            <Motion.img
              key={`${current.imageFile}-${activeIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              src={current.imageFile}
              alt={current.title || entry.title}
              className='h-45 w-full rounded-lg object-cover'
            />
          </div>

          {next && (
            <div className='absolute right-2 top-0 w-[53%] rotate-2 rounded-xl border border-white/10 bg-zinc-800/80 p-2 shadow-lg'>
              <Motion.img
                key={`${next.imageFile}-${activeIndex}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                src={next.imageFile}
                alt={next.title || entry.title}
                className='h-52.5 w-full rounded-lg object-cover'
              />
            </div>
          )}
        </div>

        <div className='space-y-3 text-left'>
          <h3 className='text-4xl font-bold leading-tight text-zinc-100'>{entry.title}</h3>
          <p className='text-lg font-semibold text-zinc-300'>{entry.month}</p>
          <p className='max-w-xl text-xl leading-relaxed text-zinc-300'>{entry.desc}</p>
          <p className='text-sm text-zinc-300'>{current.desc || 'No description provided.'}</p>
          {entry.location && <p className='text-sm text-zinc-400'>Location: {entry.location}</p>}

          <div className='flex items-center gap-3 pt-2'>
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
      </div>
    </Motion.article>
  )
}

export default TemplatePolaroid