import React from 'react'
import Icon from '../assets/favicon.png'
const Header = () => {
  return (
    <div className=' border shadow-md  px-10 py-2 flex items-center justify-between'>
        <div className='flex items-center justify-center gap-1'>
            <img src={Icon} alt="icon" className='h-10' id='icon' />
            <label htmlFor="icon" className='text-2xl font-bold'>ScrapBook</label>
        </div>
        <div className='flex gap-4'>
            <button>Login</button>
            <button>Sign Up</button>
        </div>

      
    </div>
  )
}

export default Header
