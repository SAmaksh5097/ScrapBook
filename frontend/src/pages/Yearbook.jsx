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
    <div className='flex gap-3 flex-col items-center min-h-screen h-fit py-4'>
        {/* start of yearbook */}
        <div>
            <h1 className='text-4xl font-bold'>Year 2024</h1>
        </div>

        {/* yearbook content */}
        <div className='flex w-full flex-col items-center gap-6 px-4 py-4'>
          {templatePreviewEntries.map((entry) => {
            const SelectedTemplate = templateComponents[entry.templateIndex]

            return <SelectedTemplate key={entry.id} entry={entry} />
          })}
        </div>


        {/* the end of yearbook */}
        <div>
            <h1 className='text-3xl'>That's a wrap!</h1>
        </div>

      
    </div>
  )
}

export default Yearbook
