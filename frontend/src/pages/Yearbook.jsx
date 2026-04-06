import React from 'react'
import TemplateClassic from '../templates/TemplateClassic'
import TemplatePolaroid from '../templates/TemplatePolaroid'
import TemplateTimeline from '../templates/TemplateTimeline'
import TemplateNeonBoard from '../templates/TemplateNeonBoard'
import TemplatePostcard from '../templates/TemplatePostcard'
import TemplateFilmstrip from '../templates/TemplateFilmstrip'

const dummyYearbookData = [
  {
    id: 1,
    title: 'First Hackathon Win',
    month: '2024-01',
    imageFile: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    desc: 'Built a productivity app overnight and won best UI concept.',
    location: 'Campus Lab',
    moments: [
      {
        title: 'Final Pitch',
        month: '2024-01',
        imageFile: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        desc: 'Team huddle minutes before final project presentation.'
      },
      {
        title: 'Winner Announcement',
        month: '2024-01',
        imageFile: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        desc: 'Celebration photo right after winners were announced.'
      }
    ]
  },
  {
    id: 2,
    title: 'Rainy Evening Ride',
    month: '2024-03',
    imageFile: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    desc: 'Unexpected rain, music on, and a very peaceful bike ride through the city.',
    location: 'Downtown',
    moments: [
      {
        title: 'City Lights',
        month: '2024-03',
        imageFile: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
        desc: 'Wet roads reflecting city lights during the ride back home.'
      },
      {
        title: 'Quiet Streets',
        month: '2024-03',
        imageFile: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
        desc: 'A calm route home with almost no traffic.'
      }
    ]
  },
  {
    id: 3,
    title: 'Family Reunion Lunch',
    month: '2024-06',
    imageFile: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    desc: 'Stories, laughter, and food that tasted like childhood memories.',
    location: 'Grandma\'s House',
    moments: [
      {
        title: 'Before Lunch',
        month: '2024-06',
        imageFile: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
        desc: 'Traditional family dishes laid out before the feast started.'
      },
      {
        title: 'After Stories',
        month: '2024-06',
        imageFile: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        desc: 'Group selfie full of smiles after hearing old stories.'
      }
    ]
  },
  {
    id: 4,
    title: 'Project Launch Day',
    month: '2024-09',
    imageFile: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    desc: 'Shipped the first full version after weeks of debugging and design tweaks.',
    location: 'Remote',
    moments: [
      {
        title: 'Deploy Time',
        month: '2024-09',
        imageFile: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
        desc: 'Monitoring logs and fixing last-minute issues with the team.'
      },
      {
        title: 'Post Launch',
        month: '2024-09',
        imageFile: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
        desc: 'Team recap after launch with notes for the next sprint.'
      }
    ]
  }
]

const templateComponents = [
  TemplateClassic,
  TemplatePolaroid,
  TemplateTimeline,
  TemplateNeonBoard,
  TemplatePostcard,
  TemplateFilmstrip
]

const templatePreviewEntries = templateComponents.map((_, templateIndex) => {
  const sourceEntry = dummyYearbookData[templateIndex % dummyYearbookData.length]

  return {
    ...sourceEntry,
    id: `template-preview-${templateIndex + 1}`,
    templateIndex
  }
})

const Yearbook = () => {
  return (
    <div className='relative min-h-screen overflow-hidden bg-black px-4 py-6 sm:px-6 sm:py-8'>
      <div className='pointer-events-none absolute -left-24 top-14 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl' />
      <div className='pointer-events-none absolute -right-16 top-28 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-rose-300/10 blur-3xl' />

      <div className='relative mx-auto flex w-full max-w-7xl flex-col gap-8'>
        {/* start of yearbook */}
        <div className='rounded-3xl border border-zinc-300/70 bg-white/70 px-6 py-8 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-sm'>
          <p className='text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500'>ScrapBook</p>
          <h1 className='mt-2 text-center text-4xl font-bold text-zinc-800 sm:text-5xl'>Year 2024</h1>
          <p className='mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 sm:text-base'>
            A visual trail of memories and moments, showcased in different template styles.
          </p>
        </div>

        {/* yearbook content */}
        <div className='relative flex w-full flex-col gap-8 py-2'>
          <div className='pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-zinc-300/80 md:block' />
          {templatePreviewEntries.map((entry, index) => {
            const SelectedTemplate = templateComponents[entry.templateIndex]
            const alignmentClass = index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'

            return (
              <div key={entry.id} className={`relative flex w-full justify-center ${alignmentClass}`}>
                <div className='absolute left-1/2 top-7 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-zinc-300 bg-white shadow md:block' />
                <SelectedTemplate entry={entry} />
              </div>
            )
          })}
        </div>

        {/* the end of yearbook */}
        <div className='mb-2 rounded-2xl border border-zinc-300/70 bg-white/70 px-5 py-6 text-center shadow-[0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-sm'>
          <h1 className='text-3xl font-bold text-zinc-800'>That&apos;s a wrap!</h1>
          <p className='mt-2 text-sm text-zinc-600'>More stories coming in the next chapter.</p>
        </div>

      </div>
    </div>
  )
}

export default Yearbook
