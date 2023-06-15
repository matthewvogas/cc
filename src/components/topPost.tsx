import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'
import { post } from '@prisma/client'

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

export default function TopPost({posts}: {posts: post[]}) {
  const postData = posts.sort((a, b) => b.likesCount! - a.likesCount!).slice(0, 4) ||  creatorCards

  return (
    <div className='md-12 flex gap-x-6 gap-y-8 overflow-scroll'>
      {postData.map((card: post, index: any) => (
        <div
          key={index}
          className={`h-fit w-96 max-w-sm overflow-hidden border-2 border-slate-200 bg-beigeTransparent ${ptMono.className}`}>
          <div className='flex h-96 flex-col justify-between bg-rose-100 p-6'>
            <h4 className='mb-2 self-baseline rounded-xl bg-white px-4 py-3 text-base opacity-80 '>
              @{card.username}
            </h4>

            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p> */}
          </div>

          <div className='flex gap-4 px-6 pt-6'>
            <h4 className=' mb-2 rounded-full bg-white px-4 py-3 text-base'>
              {card.reachCount} views
            </h4>
            <h4 className=' mb-2 rounded-full bg-white px-4 py-3 text-base'>
              {card.likesCount} likes
            </h4>
            <div className='flex-grow border-t border-gray-200 pb-2'></div>
          </div>
          <div className='px-6 pb-2 '>
            <div className='flex justify-end align-middle'>
              <span className='mb-2 mr-2 mt-4 inline-block py-1 pr-2 text-sm font-semibold italic text-gray-700'>
                view more
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
