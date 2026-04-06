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
    <div className='min-h-screen h-fit w-full bg-black text-white relative'>
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/2024' element={<Yearpage/>}/>
        <Route path='/dashboard/2024/memoryid' element={<Memorypage/>}/>
        <Route path='/yearbook' element={<Yearbook/>}/>
      </Routes>    
      <Footer/>
    </div>
  )
}

export default App
