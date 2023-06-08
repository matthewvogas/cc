import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/campaignCover.jpg'
import { campaign } from '@prisma/client'
import Link from 'next/link'

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

type Props = {
  campaignsWithPosts: (campaign & {
    _count: {
      posts: number
    }
  })[]
}

export default function DashboardCampaign({ campaignsWithPosts }: Props) {
  const postData = campaignsWithPosts || creatorCards

  return (
    <div className='flex content-start gap-x-6 gap-y-8 overflow-scroll px-14'>
      {postData.map(
        (
          card: campaign & {
            _count: {
              posts: number
            }
          },
          index: any,
        ) => (
          <Link href={`/campaigns/${card.id}`} key={index}
            className={`bg-beigeTransparent ${ptMono.className}`}>
            <Image src={imageCover} alt={card.name} height={320}/>
            <div className='mb-4 flex justify-between gap-4 px-6 pt-6'>
              <h5>{card.name}</h5>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className=' ml-8 h-6 w-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </div>
            <hr className='my-2 h-px border-0 bg-gray-200'></hr>
            <div className='flex  flex-col gap-4 px-6 pt-6'>
              <h4 className=' mb-2 self-baseline rounded-full bg-white px-4 py-3 text-base'>
                {card._count.posts} {`post(s)`}
              </h4>
              <div className='flex-grow border-t border-gray-200 pb-2'></div>
            </div>
          </Link>
        ),
      )}
    </div>
  )
}
