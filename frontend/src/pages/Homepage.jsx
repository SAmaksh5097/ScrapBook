import React from 'react'
import Header from '../components/Header'
import Herosection from '../components/Herosection'
import Steps from '../components/Steps'


const Homepage = () => {
  return (
    <div className='w-full bg-black text-white pb-20'>
      <Herosection/>
      <Steps/>
    </div>
  )
}

export default Homepage
