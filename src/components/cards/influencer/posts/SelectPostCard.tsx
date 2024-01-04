'use client'

import InstagramLogo from 'public/assets/creatorRegister/instagram-black-share-icon.svg'
import TikToksLogo from 'public/assets/creatorRegister/tiktok-black-share-icon.svg'
import imageCover from 'public/assets/register/creatorImg.jpg'
import UseThisPost from '../../agency/posts/useThisPost'
import { Post } from '@/types/campaign/campaignRes'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePostStore } from '../../agency/posts/store/postsStore'

type SelectPostCardProps = {
  post: any
  isSelected: boolean
  onToggleSelect: () => void
}

export default function SelectPostCard({
  post,
  isSelected,
  onToggleSelect,
}: SelectPostCardProps) {
  const selectedStyle = isSelected ? 'border-2 border-[#d4c4ae] ' : ''

  return (
    <>
      <div
        className={`h-fit w-auto max-w-sm overflow-visible rounded-2xl border-2 border-transparent bg-cardBackground ${selectedStyle}  ${ptMono.className}`}
        onClick={onToggleSelect}>
        {post.imageUrl && (
          <Image
            priority
            className={`h-60 md:h-80 rounded-2xl object-cover`}
            src={post.imageUrl || imageCover}
            alt='background'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%' }}
            unoptimized={true}
          />
        )}
        <div className='px-6 pt-6'>
          <h4 className=' mb-2 rounded-xl bg-cardRose px-3 py-2 md:px-4 md:py-3 text-[10px] lg:text-base'>
            <div className='flex gap-1 md:gap-2 items-center'>
              {/* svg de la red social */}
              {post.creator?.platform == 'instagram' && (
                <Image
                  src={InstagramLogo}
                  className='w-[16px] h-[16px] md:w-[22px] md:h-[22px]'
                  alt=''
                />
              )}
              {post.creator?.platform == 'tiktok' && (
                <Image
                  src={TikToksLogo}
                  className='w-[16px] h-[16px] md:w-[22px] md:h-[22px]'
                  alt=''
                />
              )}
              <span className='truncate text-sm lg:text-lg'>
                {' '}
                @{post.creator?.username || ''}
              </span>
            </div>
          </h4>

          <span className=' inline-flex h-6 w-full rounded text-center text-[10px] lg:text-sm text-gray-500 '>
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
            {post.creator?.followersCount || '-'} followers
          </span>
          <div className='flex-grow border-t border-gray-200 pb-2'></div>
        </div>
        <div className='flex flex-col px-6 pb-2'>
          {/* Posts data */}
          <div>
            {post.commentsCount !== undefined && post.commentsCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Comments: {post.commentsCount}
              </span>
            ) : null}

            {post.likesCount !== undefined && post.likesCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Likes: {post.likesCount}
              </span>
            ) : null}

            {post.reachCount !== undefined && post.reachCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Reach: {post.reachCount}
              </span>
            ) : null}

            {post.engagementCount !== undefined && post.engagementCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Engagement: {post.engagementCount}
              </span>
            ) : null}

            {post.impressionsCount !== undefined &&
            post.impressionsCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Impressions: {post.impressionsCount}
              </span>
            ) : null}

            {post.savesCount !== undefined && post.savesCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Saved: {post.savesCount}
              </span>
            ) : null}

            {post.sharesCount !== undefined && post.sharesCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Shares: {post.sharesCount}
              </span>
            ) : null}

            {post.playsCount !== undefined && post.playsCount > 0 ? (
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
                Plays: {post.playsCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
