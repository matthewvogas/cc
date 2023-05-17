
// Style
const buttonsStyle =
  'px-8 py-2 mr-4 border-2 border-transparent text-xm rounded-full items-center rounded-full p-2 text-gray-900 hover:border-2 hover:border-rose-200 focus:border-rose-200'

// Arrays
const buttons = [
  {
    label: ' overview',
    path: '#',
  },
  {
    label: ' creators',
    path: '#',
  },
  {
    label: ' posts',
    path: '#',
  },
  {
    label: ' stats',
    path: '#',
  },
  {
    label: ' share',
    path: '#',
  },
  {
    label: ' settings',
    path: '#',
  },
]

// Show Arrays
const listButtons = buttons.map((button, index) => (
  <a type='button' key={index} href={button.path} className={buttonsStyle}>
    {button.label}
  </a>
))

type Props = {
  title: string
}

export default function ButtonGroup({ title }: Props) {
  return (
    <div className='my-4 mb-12 w-full md:px-12'>
      <h4 className='mb-4'>{title}</h4>
      {listButtons}
    </div>
  )
}
