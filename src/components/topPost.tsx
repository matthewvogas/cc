'use client'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/TopPost.jpg'
import { isMp4, isVideo } from '@/utils/ValidationsHelper'
import Link from 'next/link'
import { Post } from '@/types/campaign/campaignRes'
import { useState } from 'react'

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

export default function TopPost({ posts }: { posts: Post[] }) {
  const postData =
    posts.sort((a: any, b: any) => b.likesCount! - a.likesCount!).slice(0, 4) ||
    creatorCards

  return (
    <div className='md-12 flex gap-x-6 gap-y-8'>
      {postData.map((card, index: any) => (
        <div
          key={index}
          className={`h-fit min-w-[384px] overflow-hidden border-2 border-slate-200 bg-beigeTransparent ${ptMono.className}`}>
          <div
            className='flex h-96 flex-col justify-between bg-white overflow-clip'
            style={{ overflowX: 'auto' }}>
            <div className='z-10' style={{ position: 'sticky', left: '0' }}>
              <h4 className='absolute z-10 ml-4 mt-4 rounded-xl bg-white px-4 py-3 text-base opacity-80'>
                @{card.creator?.username || 'username'}
              </h4>
              <p className='max-h-24 z-10 absolute mt-[280px] ml-3 w-[356px] text-white overflow-clip'>
                {card.caption}
              </p>
            </div>

            {card.imageUrl && (
              <Image
                priority
                className={`h-96 w-full object-cover`}
                src={card.imageUrl || imageCover}
                alt='background'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            {!card.imageUrl && card.mediaUrl?.includes('.mp4') && (
              <div
                style={{ position: 'relative', width: '100%', height: '100%' }}>
                <video
                  className={`h-96 w-full object-cover relative`}
                  id='videoPlayer'
                  controls={false}>
                  <source src={card.mediaUrl || undefined} type='video/mp4' />
                </video>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                    pointerEvents: 'none',
                  }}></div>
              </div>
            )}
          </div>

          <div className='flex gap-4 px-6 pt-6 mb-6'>
            <h4 className=' w-full rounded-full bg-white px-4 py-3 text-base'>
              {card.reachCount} views
            </h4>
            <h4 className=' w-full rounded-full bg-white px-4 py-3 text-base'>
              {card.likesCount} likes
            </h4>
          </div>

          <div className='px-6 pb-2 '>
            <div className='flex justify-end align-middle'>
              <Link
                target='_blank'
                href={String(card.permalink)}
                className='mb-2 mr-2 mt-4 inline-block py-1 pr-2 text-sm font-semibold italic text-gray-700'>
                view more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
