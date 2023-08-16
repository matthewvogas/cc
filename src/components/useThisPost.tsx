'use client'

import { PT_Mono } from 'next/font/google'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import imageCover from 'public/assets/register/creatorImg.jpg'
import React from 'react'
import { Post } from '@/types/campaign/campaignRes'
import Spinner from './ui/spinner'

type Props = {
  post?: Post
}

export default function UseThisPost({ post }: Props) {
  const [codeToCopy, setcodeToCopy] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Campaign</title> </head> <body>' +
    '<iframe src="http://dev.codecoco.co/campaign/' +
    post?.campaignId +
    '"' +
    ' height="200" width="300"></iframe>' +
    '</body> </html>'
  const iframe =
    '<iframe src="http://dev.codecoco.co/campaign/' +
    post?.campaignId +
    ' height="200" width="300"></iframe>'

  const handleDownloadClick = async () => {
    setLoading(true)
    const url = post?.mediaUrl || post?.imageUrl
    if (url) {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const username = post.creator?.username || 'username'
        const extension = post.mediaUrl?.includes('mp4') ? 'mp4' : 'jpg'
        const filename =
          username +
          '-campaign-' +
          post.campaignId +
          '-post-' +
          post.id +
          '.' +
          extension
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = filename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Liberar el objeto URL
        URL.revokeObjectURL(objectUrl)
      } catch (error) {
        console.error('Error al descargar el archivo:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className={`flex w-full flex-col rounded-xl bg-white py-6 md:px-6 `}>
        <div className='flex gap-6'>
          <div className='w-full'>
            <div
              className={`h-fit w-80 max-w-sm overflow-visible rounded-2xl bg-cardBackground ${ptMono.className}`}>
              {!post?.mediaUrl?.includes('.mp4') && (
                <Image
                  priority
                  className={`h-64 rounded-2xl object-cover`}
                  src={post?.imageUrl || imageCover}
                  alt='background'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
              {post?.mediaUrl?.includes('.mp4') && (
                <video className={`rounded-2xl `} controls>
                  <source src={post?.mediaUrl || undefined} type='video/mp4' />
                </video>
              )}

              <div>
                <div className='px-6 pt-6'>
                  <h4 className=' mb-2 rounded-xl bg-cardRose px-4 py-3 text-base'>
                    @{post?.creator?.username}
                  </h4>

                  {/* followers */}

                  {/* <span className=' inline-flex h-6 w-full rounded text-center text-sm text-gray-500 '>
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
                    {post?.creator?.followersCount} followers
                  </span> */}

                  {/* divider */}
                  {/* <div className='flex-grow border-t border-gray-200 pb-2'></div> */}
                </div>
                <div className='flex flex-col px-6 pb-2'>
                  {/* post data */}

                  {/* <div>
                    <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                      Comments: {post?.commentsCount}
                    </span>
                    <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                      Likes: {post?.likesCount}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col justify-end'>
            <h3 className='mb-3 text-2xl font-semibold'>Use this post 🥥</h3>
            <p className='mb-3 text-base font-light'>
              Embed this post on your website or use the content.
            </p>
            <button
              disabled={loading}
              onClick={handleDownloadClick}
              className='mb-2 w-fit rounded-full bg-[#D3F0E2] px-8 py-3 text-base font-medium'>
              {loading ? (
                <Spinner width='w-4' height='h-4' border='border-2' />
              ) : (
                'download media'
              )}
            </button>

            <div className='divider mb-4'></div>

            <h5 className='mb-2 text-lg font-medium'>Embed on your site</h5>
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
              readOnly
              placeholder='<<<'
              className='h-full w-full resize-none rounded-xl bg-[#E2DED4] bg-opacity-20 p-7 outline-none'
              name=''
              id=''></textarea>
          </div>
        </div>
      </div>
    </>
  )
}
