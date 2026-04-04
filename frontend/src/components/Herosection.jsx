import React from 'react'

const Herosection = () => {
  return (
    <div className='relative flex min-h-[calc(100vh-72px)] items-center bg-black px-4 py-16 text-white md:px-10'>
        <div className='mx-auto w-full max-w-7xl'>
          <h1 className='text-[2.8rem] leading-[0.95] font-black tracking-tight md:text-[6rem] lg:text-[8rem]'>YOUR YEAR,</h1>
          <h1 className='text-[2.8rem] leading-[0.95] font-black tracking-tight md:text-[6rem] lg:text-[8rem]'>PRESERVED.</h1>
          <div className='mt-8 w-full max-w-2xl border-l-2 border-white/70 pl-4 md:mt-10 md:pl-6'>
            <p className='text-lg leading-relaxed md:text-2xl'>Easy to build, effortless to share, and made to relive every special moment with your loved ones.</p>
            <div>
              <button className='mt-6 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white hover:shadow-[0_0_0_1px_white_inset] md:px-8 md:py-3 md:text-base cursor-pointer'>Get Started</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Herosection
