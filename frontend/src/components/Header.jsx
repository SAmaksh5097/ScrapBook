import React from 'react'
import Icon from '../assets/favicon.png'
const Header = () => {
  return (
    <div className='border-b border-white/35 bg-[#131313] px-4 py-3 backdrop-blur text-white md:px-10'>
        <div className='mx-auto flex w-full max-w-7xl items-center justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <img src={Icon} alt="icon" className='h-9 w-9   p-1 md:h-10 md:w-10' id='icon' />
            <label htmlFor="icon" className='text-xl font-bold tracking-wide md:text-2xl'>ScrapBook</label>
          </div>
          <div className='flex gap-2 md:gap-3'>
            <button className='rounded-full border border-white px-4 py-1.5 text-sm transition hover:bg-white hover:text-black md:px-5 md:text-base'>Login</button>
            <button className='rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white hover:shadow-[0_0_0_1px_white_inset] md:px-5 md:text-base'>Sign Up</button>
          </div>
        </div>
      
    </div>
  )
}

export default Header
