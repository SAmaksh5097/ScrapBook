import React, { useState } from 'react'
import { motion as Motion } from 'motion/react'

const TemplatePostcard = ({ entry }) => {
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
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-4 rounded-2xl border border-dashed border-white/15 bg-zinc-800/80 p-4'>
          <Motion.img
            key={`${current.imageFile}-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            src={current.imageFile}
            alt={current.title || entry.title}
            className='h-72 w-full rounded-xl object-cover'
          />
          <p className='text-sm italic text-zinc-300'>{current.desc || 'No description provided.'}</p>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={showPrevious}
              className='rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 text-sm font-semibold text-zinc-100 hover:bg-zinc-700/90'
              aria-label='Previous image'
            >
              ←
            </button>
            <button
              type='button'
              onClick={showNext}
              className='rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 text-sm font-semibold text-zinc-100 hover:bg-zinc-700/90'
              aria-label='Next image'
            >
              →
            </button>
          </div>
        </div>

        <div className='flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-800/75 p-5'>
          <div className='space-y-2'>
            <p className='text-xs font-semibold uppercase tracking-widest text-zinc-300'>{entry.month}</p>
            <h3 className='text-4xl font-bold text-zinc-100'>{entry.title}</h3>
            <p className='text-zinc-300'>{entry.desc}</p>
          </div>

          {entry.location && (
            <div className='space-y-1 text-sm text-zinc-400'>
              <p><span className='font-semibold'>Location:</span> {entry.location}</p>
            </div>
          )}
        </div>
      </div>
    </Motion.article>
  )
}

export default TemplatePostcard
