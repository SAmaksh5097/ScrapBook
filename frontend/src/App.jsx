import Footer from './components/Footer'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import {Router, Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>    
    <Footer/>
    </>
  )
}

export default App
