import React from 'react'

const Features = () => {
    const points = ["Upload","Auto Organize","Share"];
  return (
    <div className='border-t border-white/20 px-4 py-14 md:px-10 md:py-20'>
        <div className='mx-auto w-full max-w-7xl'>
          <h1 className='mb-10 text-center text-3xl font-bold tracking-wide md:mb-14 md:text-5xl'>Features</h1>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
            {
                points.map((point,index)=>{
                    return <Card title={point} key={index}/>
                }
                )
            }
          </div>
        </div>
    </div>
  )
}

const Card = ({title})=>{
    return(
        <div className='group rounded-2xl border border-white/35 bg-black p-6 text-white transition duration-300 hover:-translate-y-1 hover:border-white hover:shadow-[0_0_0_1px_white] md:p-8'>
            <h1 className='text-xl font-semibold tracking-wide md:text-2xl'>{title}</h1>

        </div>
    )
}

export default Features
