'use client'

import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/creatorImg.jpg'
import { post } from '@prisma/client'
import { isMp4, isVideo } from '@/utils/ValidationsHelper'

export default function PostCard({ post }: { post: post }) {
  return (
    <div
      className={`h-fit w-80 max-w-sm overflow-hidden rounded-2xl bg-cardBackground ${ptMono.className}`}>
      {!isVideo(post) && (
        <Image
          priority
          className={`h-64 rounded-2xl object-cover`}
          src={post.imageUrl || imageCover}
          alt='background'
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      )}
      {isVideo(post) && (
        <video className={`rounded-2xl `} controls>
          <source src={post.videoUrl || undefined} type='video/mp4' />
        </video>
      )}
      <div className='px-6 pt-6'>
        <h4 className=' mb-2 rounded-xl bg-cardRose px-4 py-3 text-base'>
          @{post.username}
        </h4>
        <span className=' inline-flex h-6 w-full rounded text-center text-sm text-gray-500 '>
          <svg
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            viewBox='0 0 30 30'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          {post.followersCount} followers
        </span>
        <div className='flex-grow border-t border-gray-200 pb-2'></div>
      </div>
      <div className='px-6 pb-2 '>
        {/* <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
          Views: {props.reachCount}
        </span> */}
        <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
          Comments: {post.commentsCount}
        </span>
        <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
          Likes: {post.likesCount}
        </span>
        <div className='flex justify-end align-middle'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='gray'
            className='h-6 w-6'>
            <path
              fillRule='evenodd'
              d='M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
