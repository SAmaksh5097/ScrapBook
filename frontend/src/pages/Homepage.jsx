import React from 'react'
import Header from '../components/Header'
import Herosection from '../components/Herosection'
import Steps from '../components/Steps'


const Homepage = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Herosection/>
      <Steps/>
      
    </div>
  )
}

export default Homepage
