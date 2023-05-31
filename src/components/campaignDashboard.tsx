import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'

// Fonts

// Arrays
const creatorCards = [
  {
    media_url: imageCover,
    views: '20,000',
    likes: '2 ,000',
  },
  {
    media_url: imageCover,
    views: '120',
    likes: '20000',
  },
  {
    media_url: imageCover,
    views: '322',
    likes: '15,000',
  },
  {
    media_url: imageCover,
    views: '15,000',
    likes: '98',
  },
]

export default function DashboardCampaign() {
  const postData = creatorCards

  return (
    <div className='flex content-start gap-x-6 gap-y-8 overflow-scroll px-14'>
      {postData.map((card: any, index: any) => (
        <div key={index} className={`bg-beigeTransparent ${ptMono.className}`}>
          <div className='h-80 bg-rose-100 p-6'></div>
          <div className='mb-4 flex justify-between gap-4 px-6 pt-6'>
            <h5>Revolve Clothing</h5>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className=' ml-8 h-6 w-6'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
              />
            </svg>
          </div>
          <hr className='my-2 h-px border-0 bg-gray-200'></hr>
          <div className='flex  flex-col gap-4 px-6 pt-6'>
            <h4 className=' mb-2 self-baseline rounded-full bg-white px-4 py-3 text-base'>
              {card.views} creators
            </h4>
            <h4 className=' mb-2 self-baseline rounded-full bg-white px-4 py-3 text-base'>
              {card.likes} post
            </h4>
            <div className='flex-grow border-t border-gray-200 pb-2'></div>
          </div>
        </div>
      ))}
    </div>
  )
}
