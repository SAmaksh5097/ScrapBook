import React, { useCallback, useEffect, useState } from 'react'
import { motion as Motion } from 'motion/react'
import { useParams } from 'react-router-dom'
import TemplateClassic from '../templates/TemplateClassic'
import TemplatePolaroid from '../templates/TemplatePolaroid'
import TemplateTimeline from '../templates/TemplateTimeline'
import TemplateNeonBoard from '../templates/TemplateNeonBoard'
import TemplatePostcard from '../templates/TemplatePostcard'
import TemplateFilmstrip from '../templates/TemplateFilmstrip'
import { fetchMemoriesWithMoments } from '../services/api/memoryApi'
import { useAuth } from '@clerk/react'

const templateComponents = [
  TemplateClassic,
  TemplatePolaroid,
  TemplateTimeline,
  TemplateNeonBoard,
  TemplatePostcard,
  TemplateFilmstrip
]


// const userId = 1234

const formatEntryMonth = (value) => {
  if (!value) {
    return 'Unknown date'
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value)
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric'
  }).format(parsedDate)
}

const dedupeByKey = (items, getKey) => {
  const seenKeys = new Set()

  return items.filter((item) => {
    const key = getKey(item)

    if (seenKeys.has(key)) {
      return false
    }

    seenKeys.add(key)
    return true
  })
}

const normalizeMemoryEntry = (memory) => ({
  id: memory.memory_id,
  title: memory.title,
  month: formatEntryMonth(memory.date),
  imageFile: memory.cover_img_url,
  desc: memory.description,
  location: memory.location,
  moments: memory.moments.map((moment) => ({
    id: moment.moment_id,
    title: moment.title,
    month: formatEntryMonth(moment.date || memory.date),
    imageFile: moment.img_url,
    desc: moment.description
  }))
})



const Yearbook = () => {
  const {userId, getToken} = useAuth()
  const { year } = useParams()
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadYearbook = useCallback(async () => {
    if (!year) {
      setEntries([])
      setError('Missing year in the route.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Fetch all memories with moments in a single query (no N+1 problem)
      const memoriesResponse = await fetchMemoriesWithMoments(userId, year, getToken)
      const memories = Array.isArray(memoriesResponse) ? memoriesResponse : []
      const uniqueMemories = dedupeByKey(memories, (memory) => String(memory.memory_id))
      const usedMomentKeys = new Set()

      // Transform each memory entry, deduplicate moments
      const memoriesWithMoments = uniqueMemories.map((memory) => {
        const uniqueMoments = dedupeByKey(memory.moments || [], (moment) => {
          if (moment.moment_id !== undefined && moment.moment_id !== null) {
            return `id:${moment.moment_id}`
          }

          return `fallback:${memory.memory_id}:${moment.title || ''}:${moment.date || ''}:${moment.img_url || ''}`
        }).filter((moment) => {
          const momentKey = moment.moment_id !== undefined && moment.moment_id !== null
            ? `id:${moment.moment_id}`
            : `fallback:${memory.memory_id}:${moment.title || ''}:${moment.date || ''}:${moment.img_url || ''}`

          if (usedMomentKeys.has(momentKey)) {
            return false
          }

          usedMomentKeys.add(momentKey)
          return true
        })

        return {
          ...normalizeMemoryEntry(memory),
          moments: uniqueMoments.map((moment) => ({
            id: moment.moment_id,
            title: moment.title,
            month: formatEntryMonth(moment.date || memory.date),
            imageFile: moment.img_url,
            desc: moment.description
          }))
        }
      })

      setEntries(memoriesWithMoments)
    } catch (fetchError) {
      console.error('Failed to load yearbook data:', fetchError)
      setEntries([])
      setError('Unable to load the yearbook right now.')
    } finally {
      setIsLoading(false)
    }
  }, [year, userId, getToken])

  useEffect(() => {
    let isActive = true

    const run = async () => {
      if (!isActive) {
        return
      }

      await loadYearbook()
    }

    run()

    return () => {
      isActive = false
    }
  }, [loadYearbook])

  const templateEntries = entries.map((entry, index) => ({
    ...entry,
    templateIndex: index % templateComponents.length
  }))

  return (
    <Motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='relative w-full overflow-hidden bg-black px-4 py-6 sm:px-6 sm:py-8 pb-20'
    >
      <div className='pointer-events-none absolute -left-24 top-14 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl' />
      <div className='pointer-events-none absolute -right-16 top-28 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-300/10 blur-3xl' />

      <div className='relative mx-auto flex w-full max-w-7xl flex-col gap-8'>
        {/* start of yearbook */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='px-6 py-8 shadow-[0_10px_35px_rgba(0,0,0,0.08)]'
        >
          <h1 className='mt-2 text-center text-4xl font-bold text-white sm:text-5xl'>Year {year}</h1>
          <p className='mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 sm:text-base'>
            A visual trail of memories and moments
          </p>
        </Motion.div>

        {/* yearbook content */}
        <div className='relative flex w-full flex-col gap-8 py-2'>
          <div className='pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-zinc-300/80 md:block' />

          {isLoading && (
            <Motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='rounded-2xl border border-zinc-300/70 bg-white/70 px-5 py-8 text-center text-sm text-zinc-600 shadow-[0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-sm'
            >
              Loading memories and moments...
            </Motion.div>
          )}

          {!isLoading && error && (
            <Motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='rounded-2xl border border-rose-300/70 bg-rose-50/90 px-5 py-6 text-center text-sm text-rose-800 shadow-[0_6px_18px_rgba(0,0,0,0.08)]'
            >
              {error}
            </Motion.div>
          )}

          {!isLoading && !error && templateEntries.length === 0 && (
            <Motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='rounded-2xl border border-zinc-300/70 bg-white/70 px-5 py-8 text-center text-sm text-zinc-600 shadow-[0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-sm'
            >
              No memories found for {year}.
            </Motion.div>
          )}

          {!isLoading && !error && templateEntries.map((entry, index) => {
            const SelectedTemplate = templateComponents[entry.templateIndex]
            const alignmentClass = index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'

            return (
              <Motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.005 }}
                transition={{ duration: 0.22, delay: (index % 6) * 0.03 }}
                viewport={{ once: true }}
                className={`relative flex w-full justify-center ${alignmentClass}`}
              >
                <div className='absolute left-1/2 top-7 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-zinc-300 bg-white shadow md:block' />
                <SelectedTemplate entry={entry} />
              </Motion.div>
            )
          })}
        </div>

        {/* the end of yearbook */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.22 }}
          viewport={{ once: true }}
          className='mb-2 rounded-2xl border border-zinc-300/70 bg-white/70 px-5 py-6 text-center shadow-[0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-sm'
        >
          <h1 className='text-3xl font-bold text-zinc-800'>That&apos;s a wrap!</h1>
          <p className='mt-2 text-sm text-zinc-600'>More stories coming in the next year.</p>
        </Motion.div>

      </div>
    </Motion.div>
  )
}

export default Yearbook
