import { Inter } from 'next/font/google'

const inter = Inter({ weight: '400', subsets: ['latin'] })

export default function optionBar() {
  const buttonsStyle =
    'px-6 py-2 m-2 border-2 border-transparent rounded-full items-center rounded-full p-2 text-gray-900 hover:border-2 hover:border-rose-200 focus:border-rose-200'

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

  const listButtons = buttons.map((button, index) => (
    <a type='button' key={index} href={button.path} className={buttonsStyle}>
      {button.label}
    </a>
  ))

  return <div className='my-4 w-full'>{listButtons}</div>
}
