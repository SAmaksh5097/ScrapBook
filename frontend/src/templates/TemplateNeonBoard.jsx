import React, { useState } from 'react'
import { motion as Motion } from 'motion/react'

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
    <Motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='w-full max-w-5xl rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-sm'
    >
      <div className='grid gap-5 md:grid-cols-[1.2fr_1fr]'>
        <div className='space-y-4'>
          <h3 className='text-4xl font-bold text-zinc-100'>{entry.title}</h3>
          <p className='text-zinc-300'>{entry.desc}</p>
          <p className='text-sm text-zinc-300'>{entry.month}</p>
          {entry.location && <p className='text-sm text-zinc-400'>Location: {entry.location}</p>}

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 text-zinc-100 hover:bg-zinc-700/90'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 text-zinc-100 hover:bg-zinc-700/90'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        <div className='rounded-2xl border border-white/10 bg-zinc-800/75 p-3'>
          <Motion.img
            key={`${current.imageFile}-${activeIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            src={current.imageFile}
            alt={current.title || entry.title}
            className='h-64 w-full rounded-xl object-cover'
          />
          <p className='pt-3 text-sm text-zinc-300'>{current.desc || 'No description provided.'}</p>
        </div>
      </div>
    </Motion.article>
  )
}

export default TemplateNeonBoard
