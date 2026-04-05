import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black'>
        <div className='border-t border-white/20 px-4 py-2 text-center text-sm text-white/70 md:px-10 md:py-10'>
          <p>© {new Date().getFullYear()} ScrapBook.</p>
          <h1>WebApp made with ❤️ by SAmaksh</h1>
        </div>
      
    </div>
  )
}

export default Footer
