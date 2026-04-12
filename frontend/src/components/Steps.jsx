import { motion } from 'motion/react'

const Steps = () => {
    const points = ["Upload","Define","Relive"];

    

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      viewport={{ once: true }}
      className=' border-white/20 px-4 py-14 md:px-10 md:py-20'
    >
        <div className='mx-auto w-full max-w-7xl'>
          <h1 className='mb-10 text-center text-3xl font-bold tracking-wide md:mb-14 md:text-5xl'>Just 3 Simple Steps</h1>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6'>
            {
                points.map((point,index)=>{
                    return <Card title={point} key={index}/>
                }
                )
            }
          </div>
        </div>
    </motion.div>
  )
}

const Card = ({title})=>{
    return(
  <motion.div
    whileHover={{ y: -3 }}
    className={`group rounded-2xl border text-center bg-black p-6 text-white transition duration-400 hover:-translate-y-1 cursor-auto md:p-8}`}
  >
            <h1 className='text-xl font-semibold tracking-wide md:text-2xl'>{title}</h1>

    </motion.div>
    )
}

export default Steps
