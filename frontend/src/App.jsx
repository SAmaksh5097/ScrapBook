import Footer from './components/Footer'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import {Routes, Route} from 'react-router-dom'
import Yearpage from './pages/Yearpage'
import Memorypage from './pages/Memorypage'
import Yearbook from './pages/Yearbook'
const App = () => {
  return (
    <div className='flex flex-col min-h-screen w-full bg-black text-white'>
      <Header/>
      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/:year' element={<Yearpage/>}/>
          <Route path='/dashboard/:year/:memoryId' element={<Memorypage/>}/>
          <Route path='/yearbook' element={<Yearbook/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
