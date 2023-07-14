'use client'

import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/creatorImg.jpg'
import { Post } from '@prisma/client'
import { isMp4, isVideo } from '@/utils/ValidationsHelper'
import { Dialog } from '@headlessui/react'
import { useRef, useState } from 'react'
import React from 'react'

export default function PostCard({ post }: { post: Post }) {
  const baseUrl = 'https://codecoco.co/post/' + post.id
  const link = `${baseUrl}`

  const iframe = '<iframe src="' + link + '" height="200" width="300"></iframe>'

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Campaign</title> </head> <body>' +
    '<iframe src="' +
    link +
    '" height="200" width="300"></iframe>' +
    '</body> </html>'

  const [isOpen, setIsOpen] = useState(false)
  const [codeToCopy, setcodeToCopy] = React.useState('')

  // const handleDownloadClick = async () => {
  //   const url = !isVideo(post) ? post.imageUrl : post.videoUrl
  //   if (url) {
  //     try {
  //       const response = await fetch(url)
  //       const blob = await response.blob()
  //       const username = post.username ? post.username.replace(/\./g, '-') : ''
  //       const filename =
  //         username + '-campaign-' + post.campaignId + '-post-' + post.id
  //       const objectUrl = URL.createObjectURL(blob)

  //       const link = document.createElement('a')
  //       link.href = objectUrl
  //       link.download = filename
  //       link.style.display = 'none'
  //       document.body.appendChild(link)
  //       link.click()
  //       document.body.removeChild(link)

  //       // Liberar el objeto URL
  //       URL.revokeObjectURL(objectUrl)
  //     } catch (error) {
  //       console.error('Error al descargar el archivo:', error)
  //     }
  //   }
  // }

  return (
    <div
      className={`h-fit w-80 max-w-sm overflow-visible rounded-2xl bg-cardBackground ${ptMono.className}`}>
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
      {/* {isVideo(post) && (
        <video className={`rounded-2xl `} controls>
          <source src={post.videoUrl || undefined} type='video/mp4' />
        </video>
      )} */}
      <div className='px-6 pt-6'>
        <h4 className=' mb-2 rounded-xl bg-cardRose px-4 py-3 text-base'>
          {/* @{post.username} */}0 Followers
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
          {/* {post.followersCount} followers */}0 Followers
        </span>
        <div className='flex-grow border-t border-gray-200 pb-2'></div>
      </div>
      <div className='flex flex-col px-6 pb-2'>
        <div>
          <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
            Comments: {post.commentsCount}
          </span>
          <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
            Likes: {post.likesCount}
          </span>
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
            <div
              className={`flex w-full flex-col rounded-xl bg-white py-6 md:px-6 `}>
              <div className='flex gap-6'>
                <div className='w-full'>
                  <div
                    className={`h-fit w-80 max-w-sm overflow-visible rounded-2xl bg-cardBackground ${ptMono.className}`}>
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
                        <source
                          src={post.mediaUrl || undefined}
                          type='video/mp4'
                        />
                      </video>
                    )}
                    <div className='px-6 pt-6'>
                      <h4 className=' mb-2 rounded-xl bg-cardRose px-4 py-3 text-base'>
                        {/* @{post.username} */}
                        xd
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
                        {/* {post.followersCount} followers */}0 followers
                      </span>
                      <div className='flex-grow border-t border-gray-200 pb-2'></div>
                    </div>
                    <div className='flex flex-col px-6 pb-2'>
                      <div>
                        <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                          Comments: {post.commentsCount}
                        </span>
                        <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                          Likes: {post.likesCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-full flex-col justify-end'>
                  <h3 className='mb-3 text-2xl font-semibold'>
                    Use this post 🥥 {}
                  </h3>
                  <p className='mb-3 text-base font-light'>
                    Embed this post on your website or use the content.
                  </p>
                  <button
                    // onClick={handleDownloadClick}
                    className='mb-2 w-fit rounded-full bg-[#D3F0E2] px-8 py-3 text-base font-medium'>
                    download media
                  </button>

                  <div className='divider mb-4'></div>

                  <h5 className='mb-2 text-lg font-medium'>
                    Embed on your site
                  </h5>
                  <div className='mb-4 flex gap-2'>
                    <button
                      onClick={() => setcodeToCopy(iframe)}
                      className='rounded-full border border-transparent px-6 py-2 text-sm hover:border hover:border-[#E2DED4]'>
                      iframe
                    </button>
                    <button
                      onClick={() => setcodeToCopy(html)}
                      className='rounded-full border border-transparent px-6 py-2 text-sm hover:border hover:border-[#E2DED4]'>
                      HTML & CSS
                    </button>
                  </div>
                  <textarea
                    value={codeToCopy}
                    placeholder='<<<'
                    className='h-full w-full resize-none rounded-xl bg-[#E2DED4] bg-opacity-20 p-7 outline-none'
                    name=''
                    id=''></textarea>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
