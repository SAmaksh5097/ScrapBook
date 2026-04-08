import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
const DashboardCard = ({ title, year, cardIndex = 0 }) => {
  const accentStyles = [
    'from-white/18 via-white/6 to-transparent',
    'from-amber-300/30 via-orange-300/10 to-transparent',
    'from-zinc-200/20 via-zinc-100/5 to-transparent',
    'from-yellow-200/22 via-amber-200/8 to-transparent',
  ]
  const accentClass = accentStyles[cardIndex % accentStyles.length]

  return (
    <article className={`group relative mx-auto flex h-full w-full max-w-sm cursor-default flex-col overflow-hidden rounded-4xl border border-white/10 bg-[#131313] p-4 text-white shadow-[0_24px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl transition duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:border-white/20 hover:shadow-[0_28px_80px_rgba(0,0,0,0.42)]`}>
    <div className={`absolute inset-0 bg-linear-to-br ${accentClass}`}></div>
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,191,0,0.14),transparent_38%)]'></div>

    <div className='relative flex flex-1 flex-col justify-end rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'>
      <div className='absolute right-4 top-4 h-20 w-20 rounded-full bg-white/10 blur-2xl'></div>

      <h1 className='text-3xl font-semibold tracking-tight text-white md:text-4xl'>
        {title}
      </h1>

      <div className='mt-5 flex items-center justify-between'>
        <span className='text-xs font-medium uppercase tracking-[0.22em] text-white/60'>
          Tap to view
        </span>

        <Link
          to={`/dashboard/${year}`}
          aria-label={`Open archive for ${year}`}
          className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition duration-300 group-hover:translate-x-1 group-hover:bg-amber-200'
        >
          <MoveRight size={18} />
        </Link>
      </div>
    </div>

    </article>
  )
}

export default DashboardCard
