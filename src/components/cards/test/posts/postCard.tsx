'use client'

import InstagramLogo from 'public/assets/creatorRegister/instagram-black-share-icon.svg'
import TikToksLogo from 'public/assets/creatorRegister/tiktok-black-share-icon.svg'
import imageCover from 'public/assets/register/creatorImg.jpg'
import { Post } from '@/types/campaign/campaignRes'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { usePostStore } from '../../agency/posts/store/postsStore'

export default function PostCardTest({ post }: { post: Post }) {
  const baseUrl = 'https://codecoco.co/post/' + post.id
  const link = `${baseUrl}`

  const iframe = '<iframe src="' + link + '" height="200" width="300"></iframe>'

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Campaign</title> </head> <body>' +
    '<iframe src="' +
    link +
    '" height="200" width="300"></iframe>' +
    '</body> </html>'

  const { isOpen, setIsOpen } = usePostStore()

  return (
    <div
      className={`h-fit w-auto max-w-sm overflow-visible rounded-2xl bg-cardBackground ${ptMono.className}`}>
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
              @{post.creator?.username || 'username'}{' '}
            </span>
          </div>
        </h4>

        {/* followers */}

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
          {post.creator?.followersCount || ''} followers
        </span>
        <div className='flex-grow border-t border-gray-200 pb-2'></div>
      </div>
      <div className='flex flex-col px-6 pb-2'>
        {/* Posts data */}

        <div>
          <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
            Comments: 200
          </span>
          <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
            Likes: 10k
          </span>
          {post.creator?.username === 'withrosalind' ? (
            <div>
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
                Views: 423k
              </span>
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
                Saves: 4k
              </span>
              <span className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-semibold text-gray-700'>
                Shares: 2k
              </span>
            </div>
          ) : null}
        </div>
        <div className='dropdown-end dropdown cursor-pointer '>
          <div className='flex justify-end outline-none'>
            <svg
              tabIndex={0}
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 outline-none'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='ack dropdown-content menu rounded-box w-auto border-2 border-gray-100 bg-white p-2'>
            <button
              onClick={() => setIsOpen(true)}
              className='text-back m-2 inline-block rounded-full border-2 bg-whiteBrown px-8 py-2 text-sm font-medium hover:border-orange-100'>
              use this post
            </button>
            <Link
              href={post.permalink || ''}
              target='_blank'
              className='text-back m-2 inline-block rounded-full border-2 bg-whiteBrown px-8 py-2 text-sm font-medium hover:border-orange-100'>
              see the post
            </Link>
          </ul>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99] '>
        <div className='fixed inset-0  bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4 '>
          <Dialog.Panel
            className={`flex w-full max-w-2xl flex-col rounded-xl bg-white sm:px-0`}>
            {/* <UseThisPost post={post} /> */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
