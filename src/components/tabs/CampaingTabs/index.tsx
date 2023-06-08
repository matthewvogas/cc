'use client'

import { inter, ptMono } from '@/app/fonts'
import ButtonGroup from '@/components/buttonsGroup'
import OverviewCampaign from '@/components/overviewCampaign'
import { Tab } from '@headlessui/react'
import { campaign, post } from '@prisma/client'
import { useState } from 'react'
import Image from 'next/image'
import imageCover from 'public/assets/register/creatorImg.jpg'
import { Dialog } from '@headlessui/react'
import AddNewPost from '@/components/modals/addPosts'
import Link from 'next/link'
import AddPostsModal from '@/components/modals/AddPostsModal'
import { useRouter } from 'next/navigation'

type campaignWithStats = campaign & {
  posts: post[]
  stats: {
    postCount: number
    creatorsCount: number
    engagement: {
      likes: number
      comments: number
    }
  }
}

export default function CampaingTabs({
  campaign,
}: {
  campaign: campaignWithStats
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [openTab, setOpenTab] = useState(1)
  const [creators, setCreators] = useState(campaign.stats.creatorsCount)
  const [audience, setAudience] = useState(
    campaign.stats.engagement.likes + campaign.stats.engagement.comments,
  )
  const [content, setContent] = useState(campaign.stats.postCount)
  const [newPosts, setNewPosts] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null)

  const handlePosts = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/instagram/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPosts,
          campaignId: campaign.id,
        }),
      })

      //If res is loading

      if (res.status === 200) {
        setIsOpen(false)
        router.refresh()
      } else {
        setFetchError('There was an error fetching the posts!')
      }
    } catch (error: any) {
      setFetchError(error.message)
    }
  }

  function isVideo(post: any) {
    if (post.videoUrl) return true
    return false
  }

  return (
    <>
      <div className='flex w-full flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 md:px-12'>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(1)
              }}
              data-toggle='tab'
              role='tablist'
              className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200 `}>
              overview
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(2)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              creators
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(3)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              posts
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(4)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              stats
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(5)
              }}
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              share
            </button>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(6)
              }}
              className='text-xm -mb-px mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8  py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200'>
              settings
            </button>
          </div>

          <div className='relative mb-6 flex w-full min-w-0 flex-col break-words bg-white '>
            <div className='flex-auto '>
              <div className='tab-content tab-space'>
                <section className={openTab === 1 ? 'block' : 'hidden'}>
                  <div className='pt-6'>
                    <div
                      className={`mb-4 flex w-full md:px-12 ${ptMono.className}`}>
                      <div className='w-full'>
                        <h4 className={`text-xm mb-4 ${inter.className}`}>
                          Campaign brief
                        </h4>
                        <textarea
                          readOnly
                          value={campaign.description || ''}
                          id='message'
                          className={`${inter.className} block h-52 w-full rounded-lg border border-gray-300 bg-gray-50 p-8 text-sm text-gray-500 focus:border focus:border-gray-400 focus:outline-0`}
                          placeholder='Brief of the campaign...'
                        />
                      </div>
                      <div className='ml-8 w-full'>
                        <h4 className={`text-xm mb-4 ml-4 ${inter.className}`}>
                          Results
                        </h4>
                        <div className='m-4 flex '>
                          <span className='rounded-full bg-normalRose px-6 py-2'>
                            Creators: {creators}
                          </span>
                        </div>
                        <div className='m-4 flex '>
                          <span className='rounded-full bg-normalRose px-6 py-2'>
                            Content: {content}
                          </span>
                        </div>
                        <div className='m-4 flex '>
                          <span className='rounded-full bg-normalRose px-6 py-2'>
                            Aundience: {audience}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='pt-6'>
                      <div className='ml-12 flex flex-wrap gap-x-6 gap-y-8'>
                        {campaign.posts.length > 0 &&
                          campaign.posts.map((card: post, index: any) => (
                            <div
                              key={index}
                              className={`h-fit w-80 max-w-sm overflow-hidden rounded-2xl bg-cardBackground ${ptMono.className}`}>
                              {!isVideo(card) && (
                                <Image
                                  priority
                                  className={`h-64 rounded-2xl object-cover`}
                                  src={card.imageUrl || imageCover}
                                  alt='background'
                                  width={0}
                                  height={0}
                                  sizes='100vw'
                                  style={{ width: '100%', height: 'auto' }}
                                />
                              )}
                              {isVideo(card) && (
                                <video className={`rounded-2xl `} controls>
                                  <source
                                    src={card.videoUrl!}
                                    type='video/mp4'
                                  />
                                </video>
                              )}
                              <div className='px-6 pt-6'>
                                <h4 className=' mb-2 rounded-xl bg-cardRose px-4 py-3 text-base'>
                                  @{card.username}
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
                                  {card.followersCount} followers
                                </span>
                                <div className='flex-grow border-t border-gray-200 pb-2'></div>
                              </div>
                              <div className='px-6 pb-2 '>
                                {/* <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                              Views: {card.reachCount || 0}
                            </span> */}
                                <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                                  Comments: {card.commentsCount || 0}
                                </span>
                                <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                                  Likes: {card.likesCount || 0}
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
                          ))}
                        {campaign.posts.length === 0 && (
                          <>
                            <h1>{`Seems like you dont have posts! :(`}</h1>
                          </>
                        )}
                      </div>
                      <button
                        className='ml-12 mt-12 rounded-full bg-green-200 px-8 py-2'
                        onClick={() => setIsOpen(true)}>
                        Add posts
                      </button>
                    </div>
                  </div>
                </section>
                <div className={openTab === 2 ? 'block' : 'hidden'}></div>
                <div className={openTab === 3 ? 'block' : 'hidden'}></div>
                <div className={openTab === 4 ? 'block' : 'hidden'}>
                  <p>4</p>
                </div>
                <div className={openTab === 5 ? 'block' : 'hidden'}></div>
                <div className={openTab === 6 ? 'block' : 'hidden'}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`${ptMono.className} flex w-full max-w-lg flex-col rounded-md bg-white p-16 sm:px-0`}>
            <Dialog.Title className='mb-8 text-center'>add posts</Dialog.Title>
            <Tab.Group>
              <Tab.List className='flex flex-row items-center justify-center gap-6'>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl border-2 border-primary px-8 py-2 hover:shadow ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  add manually
                </Tab>

                {/* <Tab
          className={({ selected }) =>
            `rounded-3xl border-2 border-primary px-8  py-2 hover:shadow ${
              selected ? 'bg-primary' : ''
            }`
          }>
          upload from file
        </Tab> */}
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className='px-12 py-8'>
                  <form onSubmit={handlePosts} className='flex flex-col gap-3'>
                    <label>{`Instagram Link(s)`}</label>
                    <textarea
                      className='textarea-bordered textarea rounded-md'
                      placeholder='copy and paste multiple links here'
                      onChange={e => setNewPosts(e.target.value)}
                      required
                    />
                    {fetchError && (
                      <div className='alert alert-error justify-center shadow-lg'>
                        <div>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 flex-shrink-0 stroke-current'
                            fill='none'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <span>{fetchError}</span>
                        </div>
                      </div>
                    )}

                    <button
                      className='flex self-end rounded-full bg-green-200 px-8 py-2'
                      type='submit'>
                      add
                    </button>
                  </form>
                </Tab.Panel>

                {/* <Tab.Panel className='flex flex-col gap-4 px-16 py-8'>
          <h2>
            Download a{' '}
            <Link href={'/'}>
              sample CSV template to see an example of the format
              required
            </Link>
          </h2>
          <form className='flex flex-col gap-3'>
            <input
              type='file'
              className='file-input-bordered file-input w-full'
            />
            <button className='flex self-end' type='submit'>add</button>
          </form>
        </Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
