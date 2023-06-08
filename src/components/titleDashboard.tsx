import { PT_Mono } from 'next/font/google'
import AddNewCampaign from './addNewCampaign'
import CampaignFilter from './campaignFilter'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Style Variables

type Props = {
  title: string
  onSubmit: any
}

export default function TitleDashboard({ title }: Props) {
  return (
    <div className='w-full pt-20 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-14'>
        <div className='w-full'>
          <h3
            className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
            {title}
          </h3>

          <div className={`flex items-center justify-between`}>
            <h2 className={`text-2xl font-bold`}>welcome, Sophia 🥥</h2>
            <div className={`flex ${ptMono.className}`}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='gray'
                className='h-10 w-10 cursor-pointer'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
