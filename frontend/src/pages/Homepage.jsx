import React from 'react'
import Header from '../components/Header'
import Herosection from '../components/Herosection'
import Features from '../components/Features'

const Homepage = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header/>
      <Herosection/>
      <Features/>
      
    </div>
  )
}

export default Homepage
