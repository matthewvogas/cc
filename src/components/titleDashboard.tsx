import { PT_Mono } from 'next/font/google'
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
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(226, 222, 212, 0.75) 0%, rgba(226, 222, 212, 0.00) 100%)',
        }}
        className='pt-20 px-12 border-b-2 '>
        <div className='w-full'>
          <div className={`flex items-center justify-between`}>
            <h2 className={`text-2xl text-black pb-6 `}>
              {title} {user.name} 🥥
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
