import React from 'react'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='w-full mt-auto'
    >
      <div className='border-t border-white/35 bg-[#131313] backdrop-blur px-4 py-2 text-center text-xs text-white/70 md:px-10 md:py-3 md:text-sm space-y-0.5'>
        <p>© {new Date().getFullYear()} ScrapBook.</p>
        <p>WebApp made with ❤️ by <a href="https://samaksh-arzare.vercel.app" target="_blank" rel="noopener noreferrer" className='hover:underline'>SAmaksh</a></p>
      </div>
    </motion.footer>
  )
}

export default Footer
