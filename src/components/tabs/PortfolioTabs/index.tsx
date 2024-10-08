'use client'

import PostsByPlatform from '@/components/tabs/CampaingTabs/postsByPlatform'
import CreatorRow from '@/components/cards/agency/creators/creatorCard'
import TabsToShare from '@/components/tabs/CampaingTabs/tabsToShare'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import SettingsTab from '@/components/tabs/ClientTabs/settingsTab'
import FilterCreators from '@/components/filters/filtersCreators'
import PostCard from '@/components/cards/agency/posts/postCard'
import { CampaignRes } from '@/types/campaign/campaignRes'
import { Posts } from '@/types/posts/PostByCampaignRes'
import Stats from '@/components/stats/agency/stats'
import { Story } from '@prisma/client'
import { ptMono } from '@/app/fonts'

type StatsItem = {
  section: string
  data: { title: any; description: string }[]
}

export default function PortfoliosTabs({
  campaign,
  creators,
  posts,
  stories,
  session,
  client,
  connections,
  access,
  igpages,
  ttpages
}: {
  campaign: CampaignRes
  creators: any
  posts: Posts[]
  stories: Story[]
  session: any
  client: any
  connections: any
  access: any
  igpages: any
  ttpages: any
}) {

  const [openTab, setOpenTab] = useState(1)
  const [socialActiveFilter, setSocialActiveFilter] = useState<string[]>([])
  const [followerCountFilter, setFollowerCountFilter] = useState(0)
  const [followerCountFilterSecond, setFollowerCountFilterSecond] = useState(0)
  const [selectedCampaign, setSelectedCampaign] = useState('')

  const getLikes = useMemo(() => {
    const likes = posts.reduce(
      (totalLikes, post) => totalLikes + (post.likesCount || 0), 0
    )
    return (likes > 0) ? likes : 0
  }, [posts])

  const getViews = useMemo(() => {
    const views = posts.reduce(
      (totalImpressions, post) => totalImpressions + (post.impressionsCount || 0), 0
    )
    return (views > 0) ? views : 0
  }, [posts])

  const getReach = useMemo(() => {
    const reach = posts.reduce(
      (totalImpressions, post) => totalImpressions + (post.reachCount || 0), 0
    )
    return (reach > 0) ? reach : 0
  }, [posts])

  const getComments = useMemo(() => {
    const comments = posts.reduce(
      (totalComments, post) => totalComments + (post.commentsCount || 0), 0
    )
    return (comments > 0) ? comments : 0
  }, [posts])

  const getShares = useMemo(() => {
    const shares = posts.reduce(
      (totalShares, post) => totalShares + (post.sharesCount || 0), 0
    )
    return (shares > 0) ? shares : 0
  }, [posts])

  const getSaves = useMemo(() => {
    const saves = posts.reduce(
      (totalSaves, post) => totalSaves + (post.savesCount || 0), 0
    )
    return (saves > 0) ? saves : 0
  }, [posts])

  const getImpressions = useMemo(() => {
    const impressions = posts.reduce(
      (totalSaves, post) => totalSaves + (post.impressionsCount || 0), 0
    )
    return (impressions > 0) ? impressions : 0
  }, [posts])

  const getEngagementViews = useMemo(() => {
    const followers = creators.reduce(
      (totalFollowers: number, creator: any) => (totalFollowers + creator.followersCount), 0
    )
    const engagement = ((getLikes + getComments) / followers) * 100
    return (engagement > 0) ? engagement.toFixed(2) : 0
  }, [creators, getLikes, getComments])

  const getEngagementImpressions = useMemo(() => {
    return (getImpressions > 0) 
      ? (((getLikes + getComments) / getImpressions) * 100).toFixed(2) : 0
  }, [creators, getLikes, getComments, getImpressions])

  

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

  const [stats, setStats] = useState<StatsItem[]>([])

  const statsTest = useMemo(() => {
    return [
      {
        section: 'private',
        data: [
          { title: campaign?.posts?.length, description: 'brand posts' },
          { title: creators.length, description: 'creators' },
          { title: getLikes, description: 'likes' },
          { title: 12 + '%', description: 'engagement rate' },
          { title: getViews, description: 'views' },
          { title: getReach, description: 'reach' },
          { title: getSaves, description: 'comments' },
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
  }, [
    campaign?.posts?.length,
    creators.length,
    getLikes,
    getViews,
    getReach,
    getSaves,
  ])

  const statsNormal = useMemo(() => {
    return [
      {
        section: 'private',
        data: [
          { title: campaign?.posts?.length, description: 'posts' },
          { title: creators.length, description: 'creators' },
          { title: getLikes, description: 'likes' },
          { title: getReach, description: 'reach' },
          { title: getViews, description: 'views' },
          { title: getComments, description: 'comments' },
          { title: getEngagementViews + '%', description: 'engagement/views' },
          { title: getEngagementImpressions + '%', description: 'engagement/impression' },
        ],
      },
      {
        section: 'public',
        data: [
          { title: campaign?.posts?.length, description: 'posts' },
          { title: creators.length, description: 'creators' },
          { title: getLikes, description: 'likes' },
          { title: getReach, description: 'reach' },
          { title: getViews, description: 'views' },
          { title: getComments, description: 'comments' },
          { title: getEngagementViews + '%', description: 'engagement/views' },
          { title: getEngagementImpressions + '%', description: 'engagement/impression' },
        ],
      },
    ]
  }, [
    campaign?.posts?.length,
    creators.length,
    getLikes,
    getViews,
    getReach,
    getComments,
    getSaves,
    getShares,
  ])

  useEffect(() => {
    if (session.user.role === 'TESTER') {
      setStats(statsTest)
    } else {
      setStats(statsNormal)
    }
  }, [session.user.role, statsNormal, statsTest])

  // fix filter roney
  const [customRangeFirst, setCustomRangeFirst] = useState(0)
  const [customRangeSecond, setCustomRangeSecond] = useState(0)

  const descriptionStatStyle = 'text-sm'

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full h-screen'>
          <div className='mb-8 px-12 flex justify-between flex-wrap gap-5'>
            <div className='whitespace-nowrap overflow-y-hidden overflow-x-auto pb-2'>
              <button
                onClick={e => {
                  e.preventDefault()
                  setOpenTab(1)
                }}
                data-toggle='tab'
                role='tablist'
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${openTab == 1
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
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${openTab == 2
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
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${openTab == 3
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
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${openTab == 4
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
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${openTab == 5
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
                className={`text-xm -mb-px  mr-2 inline-block flex-auto items-center rounded-full p-2 px-8 py-2 text-left text-gray-900 last:mr-0 ${openTab == 6
                    ? 'border border-[#FACEBC]'
                    : 'border border-[#ffffff]'
                  }`}>
                settings
              </button>
            </div>
          </div>
          <div className='relative mb-6 flex w-full min-w-0 flex-col break-words bg-white h-full'>
            <div className='flex-auto '>
              <div className='tab-content tab-space'>
                <section className={openTab === 1 ? 'block' : 'hidden'}>
                  <div className=''>


                    <PostsByPlatform
                      id={campaign.id!}
                      campaign={campaign}
                      creators={creators}
                      connections={connections}
                      shared={false}
                      session={session}
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
                      setFollowerCountFilterSecond={setFollowerCountFilterSecond}
                      selectedCampaign={selectedCampaign}
                      setSelectedCampaign={setSelectedCampaign}
                      userCreators={null}
                      session={session} customRangeFirst={customRangeFirst} setCustomRangeFirst={setCustomRangeFirst} customRangeSecond={customRangeSecond} setCustomRangeSecond={setCustomRangeSecond} />
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
                    campaigns={campaign}
                    clients={[]}
                    search={''}
                    creatorsFilter={filters}
                    connections={null}
                    session={session}
                    igpages={igpages}
                    ttpages={ttpages}
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
                  <div className='flex mx-12 mb-8 gap-8'>
                    <p className=''>Top posts by views</p>
                  </div>
                  <Stats
                    campaignsFallback={[]}
                    clientsFallback={undefined}
                    stats={statsNormal}
                    frome={'campaign'}
                    userPositionId={0}
                  />

                  <div className='relative'></div>
                </div>
                <div className={openTab === 5 ? 'block' : 'hidden'}>
                  <TabsToShare campaignId={campaign.id} access={access} campaign={campaign} />
                </div>
                <div className={openTab === 6 ? 'block' : 'hidden'}>
                  <SettingsTab campaign={campaign} client={client} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
