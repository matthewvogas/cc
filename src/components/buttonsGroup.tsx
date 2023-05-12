import { Inter } from 'next/font/google'

const inter = Inter({ weight: '400', subsets: ['latin'] })
type Props = {
  title: string,
}
const buttonsStyle =
  'px-8 py-2 mr-4 border-2 border-transparent text-xm rounded-full items-center rounded-full p-2 text-gray-900 hover:border-2 hover:border-rose-200 focus:border-rose-200'

  

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

export default function ButtonGroup({title}: Props) {

  const listButtons = buttons.map((button, index) => (
    <a type='button' key={index} href={button.path} className={buttonsStyle}>
      {button.label}
    </a>
  ))

  return <div className='my-4 w-full md:px-12 mb-12'>
    <h4 className='mb-4'>{title}</h4>
    {listButtons}
    </div>
}
