import DashboardCard from '../components/DashboardCard'
import { Plus } from 'lucide-react'
const Dashboard = () => {
  const trips = [
    { id: 1, title: 'Year 2023', year: 2023 },
    { id: 2, title: 'Year 2024', year: 2024 },
    { id: 3, title: 'Year 2025', year: 2025 },
    { id: 4, title: 'Year 2026', year: 2026 },
  ]

  return (
    <div className='min-h-screen h-fit bg-black text-white py-10 px-4 md:px-10'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mb-8 flex  items-center justify-between'>
          <h1 className='text-2xl font-semibold tracking-wide md:text-4xl'>My Scrapbook Memories</h1>
          <button className='flex gap-2 border p-2 rounded bg-white text-black cursor-pointer hover:bg-gray-300 items-center transition '>
            <Plus/>
            New Year</button>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {trips.map((trip) => (
            <DashboardCard key={trip.id} title={trip.title} imageUrl="https://picsum.photos/id/1015/600/400" cardIndex={trip.id} year={trip.year} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
