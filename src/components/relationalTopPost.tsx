import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'

// Fonts

// Arrays
const creatorCards = [
  {
    media_url: imageCover,
    username: 'jasminecauntt',
    views: '20,000',
    likes: '2 ,000',
    href: '#',
  },
  {
    media_url: imageCover,
    username: 'jasminecauntt',
    views: '120',
    likes: '20000',
    href: '#',
  },
  {
    media_url: imageCover,
    username: 'jasminecauntt',
    views: '322',
    likes: '15,000',
    href: '#',
  },
  {
    media_url: imageCover,
    username: 'jasminecauntt',
    views: '15,000',
    likes: '98',
    href: '#',
  },
]

export default function RelationalTopPost() {
  const postData = creatorCards

  return (
    <div className='md-12 flex gap-x-6 gap-y-8 overflow-scroll'>
      {postData.map((card: any, index: any) => (
        <div
          key={index}
          className={`h-fit w-96 max-w-sm overflow-hidden rounded-r-3xl rounded-s-3xl border-2 border-slate-200 bg-beigeTransparent p-5 ${ptMono.className}`}>
          <h4 className=' rounded-xl bg-cardRose px-4 py-3 text-base'>
            @{card.username}
          </h4>
          <div className='flex justify-between  gap-4 pt-6'>
            <h4 className=' rounded-r-2xl rounded-s-2xl bg-white px-4 py-3 text-base'>
              {card.views} views
            </h4>
            <span className=' mr-2 mt-4 flex gap-4 py-1 pr-2 text-sm font-semibold italic text-gray-700'>
              view more
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='h-6 w-6'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
