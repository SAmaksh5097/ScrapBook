import Header from '../components/Header'
import Herosection from '../components/Herosection'

const Homepage = () => {
  return (
    <div className='bg-black text-white min-h-screen flex flex-col  gap-5'>
        <Header/>
        <div className='border shadow-md  px-10 py-2 flex items-center justify-center'>
            <Herosection/>
        </div>
      
    </div>
  )
}

export default Homepage
