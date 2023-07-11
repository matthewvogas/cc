import { PT_Mono } from 'next/font/google'
import CampaignFilter from './campaignFilter'
import { User } from '@prisma/client'
import Image from 'next/image'
import bgdashboard from 'public/assets/register/dashboardBackground.jpg'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Style Variables

type Props = {
  title: string
  user: any
}

export default function TitleDashboard({ title, user }: Props) {
  return (
    <div className='w-full'>
      <Image className=' w-full' src={bgdashboard} alt='' />
      <div className='mx-auto -mt-28 mb-8 h-36 w-full justify-between px-4 md:px-14'>
        <div className='w-full'>
          <div className={`flex items-center justify-between`}>
            <h2 className={`text-2xl`}>
              {title} {user.name} 🥥
            </h2>
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
