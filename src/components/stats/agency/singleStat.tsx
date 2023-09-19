import { ptMono } from '@/app/fonts'

const statStyle = 'px-7 py-5 bg-white font-normal rounded-lg text-base text-black'

export default function SingleStat({ influencerStats }: { influencerStats: any[] }) {

  const statList = influencerStats.map((button: any, index: number) => (

    <label key={index} className={statStyle}>
      {button.icon} {button.value} {button.label}
    </label>
  ))

  return (
    <div className={`w-full ${ptMono.className} `}>
      <div className='flex gap-2 '>{statList}</div>
    </div>
  )
}
