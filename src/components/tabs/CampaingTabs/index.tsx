'use client'

import { ptMono } from '@/app/fonts'
import TopPost from '@/components/topPost'
import PostCard from '@/components/postCard'
import { SetStateAction, useState } from 'react'
import CreatorRow from '@/components/creatorRow'
import SettingsTab from '@/components/settingsTab'
import TabsToShare from '@/components/tabsToShare'
import { Posts } from '@/types/posts/PostByCampaignRes'
import FilterCreators from '@/components/filtersCreators'
import { CampaignRes } from '@/types/campaign/campaignRes'
import Stats from '@/components/stats'
import PostsByPlatform from '@/components/postsByPlatform'

export default function CampaingTabs({
  campaign,
  creators,
  posts,
}: {
  campaign: CampaignRes
  creators: any
  posts: Posts[]
}) {
  const [openTab, setOpenTab] = useState(1)
  const [socialActiveFilter, setSocialActiveFilter] = useState<string[]>([])
  const [followerCountFilter, setFollowerCountFilter] = useState(0)
  const [followerCountFilterSecond, setFollowerCountFilterSecond] = useState(0)
  const [selectedCampaign, setSelectedCampaign] = useState('')

  const getLikes = () => {
    let likes = 0

    posts.map((post: any, key: number) => {
      if (post.likes) {
        likes += post.likes
      }
    })

    return likes
  }

  const handleRemoveSocial = (red: any) => {
    const updatedSocialFilter = socialActiveFilter.filter(c => c !== red)
    setSocialActiveFilter(updatedSocialFilter)
  }

  const handleRemoveCount = (count: any) => {
    setFollowerCountFilter(0)
    setFollowerCountFilterSecond(0)
  }

  const handleRemoveCampaign = (count: any) => {
    setSelectedCampaign('')
  }

  const filters = {
    socialActiveFilter: socialActiveFilter,
    followerCountFilter: followerCountFilter,
    followerCountFilterSecond: followerCountFilterSecond,
    selectedCampaign: selectedCampaign,
  }

  const stats = [
    {
      section: 'private',
      data: [
        { title: campaign.posts?.length, description: 'brand posts' },
        { title: creators.length, description: 'creators' },
        // { title:  getLikes(), description: 'likes' },
        // { title: 0 + '%', description: 'engament rate' },
        // { title: 0, description: 'views' },
        // { title: 0, description: 'reach' },
        // { title: 0, description: 'comments' },
      ],
    },
    {
      section: 'public',
      data: [
        { title: 'hello', description: 'creators' },
        { title: 'hello', description: 'campaigns' },
        { title: 'hello', description: 'campaigns' },
        // { title: totalViews, description: 'views' },
        // { title: totalPlays, description: 'views' },
      ],
    },
  ]

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <div className='mb-8 px-12 flex justify-between flex-wrap gap-5'>
            <div className='whitespace-nowrap overflow-y-hidden overflow-x-auto pb-2'>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(1)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 1
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                overview
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(2)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 2
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                creators
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(3)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 3
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                posts
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(4)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 4
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                stats
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(5)
                }}
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 5
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                share
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(6)
                }}
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${
                  openTab == 6
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                }`}>
                settings
              </button>
            </div>
          </div>
          <div className='relative mb-6 flex w-full min-w-0 flex-col break-words bg-white '>
            <div className='flex-auto '>
              <div className='tab-content tab-space'>
                <section className={openTab === 1 ? 'block' : 'hidden'}>
                  <div className='pt-6'>
                    <div className='mb-12'>
                      <Stats
                        campaignsFallback={[]}
                        clientsFallback={undefined}
                        stats={stats}
                        frome={'campaign'}
                        userPositionId={0}
                      />
                    </div>

                    <PostsByPlatform
                      id={campaign.id!}
                      campaign={campaign}
                      creators={creators}
                      shared={false}
                    />
                  </div>
                </section>
                <div className={openTab === 2 ? 'block' : 'hidden'}>
                  <div className='relative z-50'>
                    <FilterCreators
                      campaigns={campaign}
                      socialActiveFilter={socialActiveFilter}
                      setSocialActiveFilter={setSocialActiveFilter}
                      followerCountFilter={followerCountFilter}
                      setFollowerCountFilter={setFollowerCountFilter}
                      followerCountFilterSecond={followerCountFilterSecond}
                      setFollowerCountFilterSecond={
                        setFollowerCountFilterSecond
                      }
                      selectedCampaign={selectedCampaign}
                      setSelectedCampaign={setSelectedCampaign}
                    />
                  </div>
                  <div className='flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
                    {/* active social filter */}
                    <div className='flex justify-start w-full gap-4 px-12'>
                      {socialActiveFilter?.map((social: any, index: number) => (
                        <div
                          className={`flex flex-col rounded-xl bg-beigeSelected px-8 py-2`}
                          key={index}>
                          <div className='flex gap-2 items-center'>
                            <label className={`${ptMono.className}`}>
                              {social}
                            </label>
                            <button onClick={() => handleRemoveSocial(social)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-4 w-4'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* active follower count filter */}
                    {followerCountFilter != 0 ||
                    followerCountFilterSecond != 0 ? (
                      <div className='flex justify-start w-full gap-4 px-12'>
                        <div
                          className={`flex flex-col rounded-xl border-2 bg-beigeFirst border-beigeBorder px-8 py-2`}>
                          <div className='flex gap-2 items-center'>
                            <label className={`${ptMono.className}`}>
                              <p>
                                {followerCountFilter} -{' '}
                                {followerCountFilterSecond}
                              </p>
                            </label>
                            <button
                              onClick={() =>
                                handleRemoveCount(followerCountFilter)
                              }>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-4 w-4'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {selectedCampaign != '' ? (
                      <div className='flex justify-start w-full gap-4 px-12'>
                        <div
                          className={`flex flex-col rounded-xl  bg-beigeBorder px-8 py-2`}>
                          <div className='flex gap-2 items-center'>
                            <label className={`${ptMono.className}`}>
                              <p>{selectedCampaign}</p>
                            </label>
                            <button
                              onClick={() =>
                                handleRemoveCampaign(selectedCampaign)
                              }>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-4 w-4'>
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <CreatorRow
                    comeFrom={'campigns'}
                    creators={creators}
                    campaigns={campaign}
                    clients={[]}
                    search={''}
                    creatorsFilter={filters}
                  />
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'}>
                  <div className='pt-6'>
                    <div className='mx-6 md:ml-12 justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
                      {campaign.posts?.map((post, index: any) => (
                        <PostCard key={index} post={post} />
                      ))}
                      {campaign?.posts?.length === 0 && (
                        <div className='col-span-4 md:col-span-2'>
                          <h1>{`Seems like you don't have posts! :(`}</h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={openTab === 4 ? 'block' : 'hidden'}>
                  <div className='flex gap-8'>
                    <div className='w-96 px-12'>
                      <p className='my-8 text-xl font-bold'>Stats</p>
                      <div className='flex flex-col gap-4'>
                        <p className={`w-44 rounded-lg bg-green-50 px-6 py-4`}>
                          {`👤 ${campaign?._count?.creators} Creators`}
                        </p>
                        <p className={`w-44 rounded-lg bg-green-50 px-6 py-4`}>
                          {`📝 ${campaign?.posts?.length} Posts`}
                        </p>
                      </div>
                    </div>

                    <div className='relative'></div>
                    <div className='overflow-scroll'>
                      <p className='absolute '>Top posts by views</p>
                      <div className='w-full mt-12'>
                        <TopPost posts={campaign.posts!} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 5 ? 'block' : 'hidden'}>
                  <TabsToShare campaignId={campaign.id} />
                </div>
                <div className={openTab === 6 ? 'block' : 'hidden'}>
                  <SettingsTab campaign={campaign} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
