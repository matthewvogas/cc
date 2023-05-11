import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'

const ptMono = PT_Mono({
  weight: '400',
  subsets: ['latin'],
})

type Props = {
  title: string,

}

const ActionButtonStyle =
  'text-sm  border-rose-100 border-2 inline-block py-2 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100'
const ActiveLabel = 'bg-active px-8 mx-2 py-3 rounded-full text-black text-sm '
const InActiveLabel =
  'bg-inactive px-8 mx-2 py-3 rounded-full text-black text-sm '

export default function TitlePage({title}: Props) {
  return (
    <div className='w-full px-12 pt-12'>
      <div className='mx-auto w-full justify-between px-4 md:px-8'>
        <div className='w-full'>
          <h3
            className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
            {title}
          </h3>

          <div className={`flex items-center justify-between`}>
            <label
              className={`rounded-full bg-background px-5 py-1 text-sm text-black ${ptMono.className}`}>
              Client Name
            </label>
            <div className={`${ptMono.className}`}>
              <button
                className={`${ActionButtonStyle} `}>
                filter
              </button>
              <button
                className={`${ActionButtonStyle} `}>
                view as client
              </button>

              <button
                className={`${ActionButtonStyle}`}>
                add new
              </button>

              {/* <label className={`${ActiveLabel}`}>
                active
              </label>
              <label className={`${InActiveLabel}`}>
                Inactive
              </label> */}
            </div>
          </div>
        </div>
      </div>
      <div className="divider"/>
    </div>
  )
}
