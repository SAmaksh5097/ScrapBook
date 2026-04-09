import Footer from './components/Footer'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import {Routes, Route, useLocation} from 'react-router-dom'
import Yearpage from './pages/Yearpage'
import Memorypage from './pages/Memorypage'
import Yearbook from './pages/Yearbook'
import { AnimatePresence, motion } from 'motion/react'
import Error from './pages/Error'
const App = () => {
  const location = useLocation()

  return (
    <div className='flex flex-col min-h-screen w-full bg-black text-white'>
      <Header/>
      <main className='flex-1'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path='/' element={<Homepage/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/dashboard/:year' element={<Yearpage/>}/>
              <Route path='/dashboard/:year/:memoryId' element={<Memorypage/>}/>
              <Route path='dashboard/:year/yearbook' element={<Yearbook/>}/>
              <Route path='*' element={<Error/>}/>
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer/>
    </div>
  )
}

export default App
