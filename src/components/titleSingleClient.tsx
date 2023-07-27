import { PT_Mono } from 'next/font/google'
import { Tag } from '@prisma/client'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Style Variables
const ActionButtonStyle =
  'flex text-sm  border-gray-200 h-7 border-2 flex items-center py-2.5 px-6  text-back font-medium bg-transparent rounded-full '

type Props = {
  title: string
  tags?: Tag[]
}

export default function TitleSingleClient({ title, tags }: Props) {
  return (
    <div className='w-full pt-20 '>
      <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
        <div className='w-full'>
          <h3
            className={`items-center pb-8 text-2xl font-semibold text-gray-800 `}>
            {title}
          </h3>
          <div className={`flex items-center justify-between`}>
            <div className='flex content-center items-center gap-3'>
              <div className={`${ActionButtonStyle} `}>
                tags
                {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-4 inline h-4 w-4'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg> */}
              </div>
              {tags?.map(tag => (
                <span
                  key={tag.id}
                  className={`flex h-7  items-center rounded-full bg-gray-100 px-5 text-sm font-semibold text-gray-700`}>
                  {tag.name}
                </span>
              ))}
            </div>
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
