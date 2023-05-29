// Style
const statStyle = 'px-6 py-4 bg-green-50 rounded-lg'

// Arrays
const buttons = [
  {
    icon: '🥥',
    value: '5',
    label: 'campaigns',
  },
  {
    icon: '🤳',
    value: '12',
    label: 'creators',
  },
  {
    icon: '📱',
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

type Props = {
  title: string
}

export default function ClientStat({ title }: Props) {
  return (
    <div className='my-5 w-full md:px-12'>
      <label htmlFor='' className='italic'>
        {title}
      </label>
      <div className='my-4 flex gap-4 '>{statList}</div>
    </div>
  )
}
