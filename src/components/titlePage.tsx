import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'

const ptMono = PT_Mono({
  weight: '400',
  subsets: ['latin'],
})

const ActionButtonStyle =
  'text-sm  border-rose-100 border-2 inline-block py-2 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100'
const ActiveLabel = 'bg-active px-8 mx-2 py-3 rounded-full text-black text-sm '
const InActiveLabel =
  'bg-inactive px-8 mx-2 py-3 rounded-full text-black text-sm '

export default function titlePage() {
  return (
    <section className='w-full p-12'>
      <div className='mx-auto w-full justify-between px-4 md:px-8'>
        <div className='w-full'>
          <h3
            className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
            Title of the Page
          </h3>

          <div className={`flex items-center justify-between`}>
            <label
              className={`rounded-full bg-background px-5 py-1 text-sm text-black ${ptMono.className}`}>
              Client Name
            </label>
            <div className={``}>
              <a
                href='javascript:void(0)'
                className={`${ActionButtonStyle} ${ptMono.className}`}>
                filter
              </a>
              <a
                href='javascript:void(0)'
                className={`${ActionButtonStyle} ${ptMono.className}`}>
                view as client
              </a>

              <a
                href='javascript:void(0)'
                className={`${ActionButtonStyle} ${ptMono.className}`}>
                add new
              </a>

              <label className={`${ActiveLabel} ${ptMono.className}`}>
                active
              </label>
              <label className={`${InActiveLabel} ${ptMono.className}`}>
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
