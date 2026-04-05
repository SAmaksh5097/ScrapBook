import React, { useEffect, useState } from 'react'

const Steps = () => {
    const points = ["Upload","Auto Organize","Share"];
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((currentStep) => (currentStep + 1) % points.length);
        }, 1200);

        return () => clearInterval(interval);
    }, [points.length]);

  return (
    <div className=' border-white/20 px-4 py-14 md:px-10 md:py-20'>
        <div className='mx-auto w-full max-w-7xl'>
          <h1 className='mb-10 text-center text-3xl font-bold tracking-wide md:mb-14 md:text-5xl'>Just 3 Simple Steps</h1>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
            {
                points.map((point,index)=>{
                    return <Card title={point} isActive={activeStep === index} key={index}/>
                }
                )
            }
          </div>
        </div>
    </div>
  )
}

const Card = ({title, isActive})=>{
    return(
    <div className={`group rounded-2xl border text-center bg-black p-6 text-white transition duration-400 hover:-translate-y-1 cursor-auto md:p-8 ${isActive ? 'border-white shadow-[0_0_24px_rgba(255,255,255,0.35)] scale-[1.02]' : 'border-white/35'}`}>
            <h1 className='text-xl font-semibold tracking-wide md:text-2xl'>{title}</h1>

        </div>
    )
}

export default Steps
