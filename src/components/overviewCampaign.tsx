import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'

// Fonts
const inter = Inter({ weight: '400', subsets: ['latin'] })
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Arrays
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

// Show Arrays
const statsResults = statsResult.map((stat, index) => (
  <div key={index} className='m-4 flex '>
    <span className='rounded-full bg-normalRose px-6 py-2'>
      {stat.label}: {stat.result}
    </span>
  </div>
))

export default function OverviewCampaign({ description }: any) {
  const fallbackDescription =
    'With Rosalind was enlisted to help with the promotion of the LOreal Paris Telescopic Mascara. To achieve this we selected 300 Gen Z, Millennials, Gen X and baby boomers content creators from our platform with a TikTok following of 10k + to take part in this campaign.\n \nIn exchange for gifted product content creator followed the L’Oreal Paris brief, each creating professional content made up of Instagram Re....'
  return (
    <div className={`mb-4 flex w-full md:px-12 ${ptMono.className}`}>
      <div className='w-full'>
        <h4 className={`text-xm mb-4 ${inter.className}`}>Campaign brief</h4>
        <textarea
          readOnly
          value={description || fallbackDescription}
          id='message'
          className={`${inter.className} block h-52 w-full rounded-lg border border-gray-300 bg-gray-50 p-8 text-sm text-gray-500 focus:border focus:border-gray-400 focus:outline-0`}
          placeholder='Brief of the campaign...'></textarea>
      </div>
      <div className='ml-8 w-full'>
        <h4 className={`text-xm mb-4 ml-4 ${inter.className}`}>Results</h4>
        {statsResults}
      </div>
    </div>
  )
}
