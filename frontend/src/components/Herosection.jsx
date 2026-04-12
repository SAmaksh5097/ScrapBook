import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
const Herosection = () => {
  return (
    <div className='relative flex min-h-[calc(100vh-72px)] items-center bg-black px-4 py-16 text-white md:px-10'>
        <div className='mx-auto w-full max-w-7xl'>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='text-[2.8rem] leading-[0.95] font-black tracking-tight md:text-[6rem] lg:text-[8rem]'
          >
            YOUR MEMORIES,
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06, ease: 'easeOut' }}
            className='text-[2.8rem] leading-[0.95] font-black tracking-tight md:text-[6rem] lg:text-[8rem]'
          >
            PRESERVED.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
            className='mt-8 w-full max-w-2xl border-l-2 border-white/70 pl-4 md:mt-10 md:pl-6'
          >
            <p className='text-lg leading-relaxed md:text-2xl'>Organizing your memories made simple.</p>
            <div>
              <Link to={'/dashboard'}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className='mt-6 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white hover:shadow-[0_0_0_1px_white_inset] md:px-8 md:py-3 md:text-base cursor-pointer'
              >
                Get Started
              </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
    </div>
  )
}

export default Herosection
