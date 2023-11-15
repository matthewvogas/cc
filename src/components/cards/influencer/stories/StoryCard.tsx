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
import { Story } from '@prisma/client'

export default function StoryCard({ story }: { story: Story }) {
  const baseUrl = 'https://codecoco.co/post/' + story.id
  const link = `${baseUrl}`

  const iframe = '<iframe src="' + link + '" height="200" width="300"></iframe>'

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Campaign</title> </head> <body>' +
    '<iframe src="' +
    link +
    '" height="200" width="300"></iframe>' +
    '</body> </html>'

  const { isOpen, setIsOpen } = usePostStore()

  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${story.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const [currentPage, setCurrentPage] = useState(0)

  const storyProperties = [
    { name: 'Replies', value: story.replies },
    { name: 'Shares', value: story.shares },
    { name: 'Reach', value: story.reach },
    { name: 'Impressions', value: story.impressions },
    { name: 'Activity', value: story.profile_activity },
    { name: 'Visits', value: story.profile_visits },
    { name: 'Tap Back', value: story.tapBack },
    { name: 'Tap Exit', value: story.tapExit },
    { name: 'Swipe Forward', value: story.swipeForward },
    { name: 'Tap Forward', value: story.tapForward },
  ].filter(property => property.value !== null)

  const propertiesPerPage = 4
  const totalPages = Math.ceil(storyProperties.length / propertiesPerPage)

  const paginateProperties = (page: any) => {
    return storyProperties.slice(
      page * propertiesPerPage,
      (page + 1) * propertiesPerPage,
    )
  }

  const currentPageProperties = paginateProperties(currentPage)

  const handlePageChange = (newPage: any) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div
      className={`h-fit w-auto max-w-sm overflow-visible rounded-2xl bg-[#F2EDE7] ${ptMono.className}`}>
      {story.imageUrl && (
        <div className='relative'>
          <Image
            priority
            className={`h-60 md:h-[524px] rounded-2xl object-cover`}
            src={story.imageUrl || imageCover}
            alt='background'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%' }}
            unoptimized={true}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundImage:
                'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
              borderRadius: '12px',
            }}></div>
        </div>
      )}

      <div className='px-6 pt-6 absolute -mt-24 text-white'>
        <p className='truncate text-sm lg:text-lg mb-1'>
          @{story.username || ''}
        </p>
        <p className='text-white inline-flex h-6 w-full rounded text-center text-[10px] lg:text-sm'>
          {story.follows} follows
        </p>
      </div>

      <div className='flex flex-col px-6 pt-6'>
        <div>
          {currentPageProperties.map((property, index) => (
            <span
              key={index}
              className='mb-2 mr-2 inline-block py-1 pr-2 text-[10px] lg:text-sm font-medium text-gray-700'>
              {property.name}: {property.value}
            </span>
          ))}
        </div>

        <div className='flex justify-between items-center my-4'>
          <div>
            <div className='flex justify-end outline-none'>
              <svg
                tabIndex={0}
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='trasnparent'
                className='h-6 w-6 outline-none'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </div>
          </div>

          <div className='flex gap-1'>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`w-[14px] h-[14px] bg-[#99A09D] rounded-sm ${
                  currentPage === index ? 'bg-opacity-100' : 'bg-opacity-50'
                }`}
                onClick={() => handlePageChange(index)}></button>
            ))}
          </div>

          <div className='dropdown-end dropdown cursor-pointer  '>
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
              className='w-max dropdown-content menu rounded-box border-2 border-gray-100 bg-white p-2'>
              <button
                onClick={() => {
                  handleDelete()
                }}
                className='text-back m-2 inline-block rounded-full border-2 bg-whiteBrown px-8 py-2 text-sm font-medium hover:border-orange-100'>
                remove story
              </button>
              <Link
                href={story.permalink || ''}
                target='_blank'
                className='text-back m-2 inline-block rounded-full border-2 bg-whiteBrown px-8 py-2 text-sm font-medium hover:border-orange-100'>
                see the story
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99] '>
        <div className='fixed inset-0  bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4 '>
          <Dialog.Panel
            className={`flex w-full max-w-2xl flex-col rounded-xl bg-white sm:px-0`}></Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
