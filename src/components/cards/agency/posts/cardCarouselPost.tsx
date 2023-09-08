'use client'

import imageCover from 'public/assets/register/examplePosts.png'
import videoCover from 'public/assets/register/creatorImg.jpg'
import backArrow from 'public/assets/register/backArrow.svg'
import { Dialog, Tab } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import UseThisPost from './useThisPost'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  post: any
  key: number
}

export default function CardCarouselPost({ post, key }: Props) {
  const handlePost = () => {
    const tab = document.querySelector('.useThisPost')

    tab?.classList.remove('hidden')
    tab?.classList.add('flex')
  }

  return (
    <div id={`item${key}`} className='carousel-item gap-8'>
      <div className='w-full flex'>
        <div
          className={` w-80 max-w-sm overflow-visible rounded-2xl ${
            !post.mediaUrl.includes('mp4') ? 'bg-transparent' : 'bg-beigeFirst'
          } flex justify-center items-center ${ptMono.className}`}>
          <Image src={videoCover} className='w-full' alt={''} />
        </div>
      </div>

      <div className='w-full flex'>
        <div className='flex w-full flex-col justify-start'>
          <div>
            <h3 className='mb-3 text-2xl font-semibold'>Post info</h3>
          </div>
          <div className='divider'></div>

          <div className='p-6 border border-gray-200 rounded-xl mb-4'>
            <span className='mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
              Comments: {post?.commentsCount}
            </span>
            <span className='mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
              Likes: {post?.likesCount}
            </span>
          </div>

          <div className='w-full h-full'>
            <p className='w-[265px] h-[280px] p-6 border border-gray-200 rounded-xl overflow-x-scroll'>
              {post?.likesCount ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            </p>
          </div>
          <div className='divider'></div>
          <Tab
            onClick={() => {
              handlePost()
            }}
            className={({ selected }) =>
              `rounded-3xl bg-[#E9F7F0] border border-[#DEF3E9] px-8  py-2 ${
                selected ? 'bg-primary' : ''
              }`
            }>
            use this post 🥥
          </Tab>
        </div>
      </div>
    </div>
  )
}
