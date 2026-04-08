import { useState, useEffect } from 'react'
import DashboardCard from '../components/DashboardCard'
import { Plus } from 'lucide-react'
const Dashboard = () => {
  const[years,setYears] = useState([]);

  const userId = 1234; // in future, get this from auth context 
  async function fetchYears(){
    try{
      const response = await fetch(`http://localhost:5000/api/memories/years/${userId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(data);
      setYears(data);

    } catch(err){
      console.error('Error fetching years:', err)
    }  
  }

  useEffect(() => {
    fetchYears();
  }, []);

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
          {years.map((year) => (
            <DashboardCard key={year} title={`Year ${year.year}`}  year={year.year} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
