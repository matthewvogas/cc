'use client'
import React from 'react'
import TabsToShare from './tabsToShare'
import CampaignCard from '@/components/campaignCard'
import CreatorRow from '@/components/creatorRow'
import Search from '@/components/search'
import Tags from '@/components/tags'
import OverviewCampaign from './overviewCampaign'
import ButtonGroup from './buttonsGroup'
import Image from 'next/image'
import imageCover from 'public/assets/register/creatorImg.jpg'
import { ptMono } from '@/app/fonts'
import SettingsTab from './settingsTab'
import TopPost from './topPost'
import RelationalTopPost from './relationalTopPost'
import SingleStat from './stats/singleStat'
import SinglePlatform from './stats/singlePlatform'
import CampaignSocialStat from './stats/CampaignSocialStat'
import DashboardCampaign from './campaignDashboard'
import ClientStat from './clientStat'

const Tabs = ({ posts }: any) => {
  function isVideo(post: any) {
    if (post.videoUrl) return true
    return false
  }
  const [openTab, setOpenTab] = React.useState(1)
  return (
    <>
      <div className='flex w-full flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 md:px-6'>
            <button
              onClick={e => {
                e.preventDefault()
                setOpenTab(1)
              }}
              data-toggle='tab'
              role='tablist'
              className='text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full border-2 border-transparent p-2 px-8 py-2 text-left text-gray-900 last:mr-0 hover:border-2 hover:border-rose-200 focus:border-rose-200 '>
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
                <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                  <div className='pt-6'>
                    <OverviewCampaign />
                  </div>

                  <ButtonGroup title={'Grid'} />

                  <div className='pt-6'>
                    <div className='ml-12 flex flex-wrap gap-x-6 gap-y-8'>
                      {posts.map((card: any, index: any) => (
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
                              <source src={card.videoUrl} type='video/mp4' />
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
                            <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                              Views: {card.reachCount}
                            </span>
                            <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                              Comments: {card.commentsCount}
                            </span>
                            <span className='mb-2 mr-2 inline-block py-1 pr-2 text-sm font-semibold text-gray-700'>
                              Likes: {card.likesCount}
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
                    </div>
                  </div>

                  {/* <p>
                    <div className='flex w-full justify-start  gap-4 py-5 md:px-12'>
                      <Search />
                      <Tags />
                    </div>
                    <div className='pt-6'>
                      <CampaignCard />
                    </div>
                    <CreatorRow />
                  </p> */}
                </div>
                <div
                  className={openTab === 2 ? 'block' : 'hidden'}
                  id='link2'></div>
                <div
                  className={openTab === 3 ? 'block' : 'hidden'}
                  id='link3'></div>
                <div className={openTab === 4 ? 'block' : 'hidden'} id='link3'>
                  <div className='flex gap-8'>
                    <div className='w-96 px-12'>
                      <p className='my-8 text-xl font-bold'>Stats</p>
                      <div className='flex flex-col gap-4'>
                        <ClientStat />
                        <ClientStat />
                      </div>
                      <p className='my-8 italic'>by platform</p>
                      <SinglePlatform />
                    </div>

                    <div className=''>
                      <div className='h-96'></div>

                      <p className='mb-8 mt-12'>Top posts by views</p>

                      <div className='flex gap-6'>
                        <CampaignSocialStat />
                        <CampaignSocialStat />
                        <CampaignSocialStat />
                      </div>

                      <TopPost />

                      <p className='mb-8 mt-12'>
                        Creators who drive the most views
                      </p>

                      <RelationalTopPost />
                    </div>
                  </div>
                </div>
                <div
                  className={openTab === 5 ? 'block' : 'hidden'}
                  id='link3'></div>
                <div
                  className={openTab === 6 ? 'block' : 'hidden'}
                  id='link3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ButtonsGroupTabs({ posts }: any) {
  return (
    <>
      <Tabs posts={posts} />
    </>
  )
}
