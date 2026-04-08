import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
const DashboardCard = ({ title , year}) => {
  

  return (
    <article className={`group relative rounded-full  mx-auto flex h-full w-full max-w-sm cursor-default flex-col gap-3 border border-zinc-300 bg-[linear-gradient(to_top_right,rgb(183,224,255),rgb(255,245,205),rgb(255,207,179))]  p-3 text-black shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_14px_26px_rgba(0,0,0,0.4)]`}>
        <div className='absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-zinc-200 bg-rose-500 shadow-[0_1px_4px_rgba(0,0,0,0.4)]'>
        </div>

        <div className='space-y-1 px-1 pt-1'>
            <h1 className='text-base font-semibold leading-tight'>{title}</h1>
        </div>

            <div className='mt-auto  px-1 text-zinc-700 transition duration-300 group-hover:translate-x-1 group-hover:text-black cursor-pointer absolute bottom-2 right-2'>
                <Link to={`/dashboard/${year}`}>
                    <MoveRight size={18} />
                </Link>
            </div>

    </article>
  )
}

export default DashboardCard
