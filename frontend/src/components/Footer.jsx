import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full mt-auto'>
      <div className='border-t border-white/35 bg-[#131313] backdrop-blur px-4 py-6 text-center text-sm text-white/70 md:px-10 md:py-8'>
        <p>© {new Date().getFullYear()} ScrapBook.</p>
        <h1>WebApp made with ❤️ by <span>
            <a href="https://samaksh-arzare.vercel.app" target="_blank" rel="noopener noreferrer" className='hover:underline'>SAmaksh</a>
          </span>
        </h1>
      </div>
    </footer>
  )
}

export default Footer
