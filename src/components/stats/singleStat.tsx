import { ptMono } from '@/app/fonts'

// Style
const statStyle = 'px-7 py-5 bg-blackStat rounded-lg text-xl text-white'

// Arrays
const buttons = [
  {
    icon: '🥥',
    value: '124',
    label: 'posts',
  },
]

// Show Arrays
const statList = buttons.map((button, index) => (
  <label key={index} className={statStyle}>
    {button.icon} {button.value} {button.label}
  </label>
))

export default function SingleStat() {
  return (
    <div className={`my-5 w-full md:px-12 ${ptMono.className} `}>
      <div className='my-4 flex gap-4 '>{statList}</div>
    </div>
  )
}
