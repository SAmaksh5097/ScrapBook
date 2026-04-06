import React, { useMemo, useState } from 'react'

const TemplateImageSlider = ({ images = [], title = 'memory' }) => {
  const safeImages = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) {
      return []
    }

    return images
  }, [images])

  const [activeIndex, setActiveIndex] = useState(0)

  if (safeImages.length === 0) {
    return (
      <div className='rounded-xl border border-slate-200 bg-slate-100 p-6 text-center text-sm text-slate-500'>
        No images yet for this memory.
      </div>
    )
  }

  const activeImage = safeImages[activeIndex]

  const showPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length)
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % safeImages.length)
  }

  return (
    <div className='space-y-3'>
      <div className='relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100'>
        <img src={activeImage.url} alt={activeImage.description || title} className='h-64 w-full object-cover' />

        {safeImages.length > 1 && (
          <>
            <button
              type='button'
              onClick={showPrevious}
              aria-label='Show previous image'
              className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-white transition hover:bg-black/70'
            >
              ←
            </button>

            <button
              type='button'
              onClick={showNext}
              aria-label='Show next image'
              className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-white transition hover:bg-black/70'
            >
              →
            </button>
          </>
        )}
      </div>

      <p className='text-sm text-slate-700'>
        {activeImage.description || 'No image description provided.'}
      </p>

      {safeImages.length > 1 && (
        <div className='flex items-center gap-2'>
          {safeImages.map((image, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={`${image.url}-${index}`}
                type='button'
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-slate-800' : 'bg-slate-300'}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TemplateImageSlider