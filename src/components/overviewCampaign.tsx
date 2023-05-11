import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'

const inter = Inter({ weight: '400', subsets: ['latin'] })
const ptMono = PT_Mono({
  weight: '400',
  subsets: ['latin'],
})

const statsResult = [
  {
    label: 'Creators',
    result: 13,
  },
  {
    label: 'Content',
    result: '42',
  },
  {
    label: 'Audience',
    result: '456,234',
  },
  {
    label: 'Plays',
    result: '1,564,321',
  },
]

const statsResults = statsResult.map((stat, index) => (
  <div key={index} className='m-4 flex '>
    <span className='rounded-full bg-normalRose px-6 py-2'>
      {stat.label}: {stat.result}
    </span>
  </div>
))

export default function OverviewCampaign() {
  return (
    <div className={`flex w-full justify-center items-center  ${ptMono.className}`}>
      <div className='w-1/2'>
        <h4 className={`mb-4 text-xl ${inter.className}`}>Campaign brief</h4>
        <textarea
          id='message'
          className=' block h-52 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border focus:border-gray-400 focus:outline-0'
          placeholder='Brief of the campaign...'></textarea>
      </div>
      <div className='ml-8 w-1/2'>
        <h4 className={`mb-4 ml-4 text-xl ${inter.className}`}>Results</h4>
        {statsResults}
      </div>
    </div>
  )
}
