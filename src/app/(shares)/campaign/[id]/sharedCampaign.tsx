'use client'

import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import coverImageClient from 'public/assets/uniqueClient/clientCoverPage.jpg'
import PostsByPlatform from '@/components/tabs/CampaingTabs/postsByPlatform'
import { CampaignRes, Post } from '@/types/campaign/campaignRes'
import { Posts } from '@/types/posts/PostByCampaignRes'
import avatar from 'public/assets/register/avatar.jpg'
import { FaUserAlt, FaClone } from 'react-icons/fa'
import { useMemo, useState } from 'react'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import React from 'react'
import { Tab } from '@headlessui/react'

export function SharedCampaign({
  user,
  campaign,
  posts,
  creators,
  connections,
}: {
  user: any
  campaign: CampaignRes
  posts: Posts[]
  creators: CreatorsByCampaignRes[]
  connections: any
}) {
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

  const getEngagementViews = useMemo(() => {
    const followers = creators.reduce(
      (totalFollowers: number, creator: any) => (totalFollowers + creator.followersCount), 0
    )
    const engagement = ((getLikes + getComments) / followers) * 100
    return (engagement > 0) ? engagement.toFixed(2) : 0
  }, [creators, getLikes, getComments])

  const getImpressions = useMemo(() => {
    const impressions = posts.reduce(
      (totalSaves, post) => totalSaves + (post.impressionsCount || 0), 0
    )
    return (impressions > 0) ? impressions : 0
  }, [posts])

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
          { title: (((getLikes + getComments) / getImpressions) * 100).toFixed(2) + '%', description: 'engagement/impression' },
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
          { title: (((getLikes + getComments) / getImpressions) * 100).toFixed(2) + '%', description: 'engagement/impression' },
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

  const getFollowers = useMemo(() => {
    return creators.reduce(
      (totalFollowers, creator) =>
        totalFollowers + (creator?.followersCount || 0),
      0,
    )
  }, [creators])

  const calculateTotal = (posts: any, key: keyof Post): number => {
    return posts.reduce(
      (total: number, post: any) => total + (post[key] || 0),
      0,
    )
  }

  const predictForWeek = (total: number, numberOfPosts: number): number => {
    return (total / numberOfPosts) * 30
  }

  const totalLikes: number = calculateTotal(posts, 'likesCount')
  const totalViews: number = calculateTotal(posts, 'impressionsCount')
  const totalComments: number = calculateTotal(posts, 'commentsCount')

  const weeklyLikesPrediction: number = predictForWeek(totalLikes, posts.length)
  const weeklyViewsPrediction: number = predictForWeek(totalViews, posts.length)
  const weeklyCommentsPrediction: number = predictForWeek(
    totalComments,
    posts.length,
  )

  const statsPredicted = useMemo(() => {
    return [
      { title: weeklyViewsPrediction.toFixed(0), description: 'views' },
      { title: weeklyLikesPrediction.toFixed(0), description: 'likes' },
      { title: weeklyCommentsPrediction.toFixed(0), description: 'comments' },
    ]
  }, [weeklyLikesPrediction, weeklyViewsPrediction, weeklyCommentsPrediction])

  const [typeStat, setTypeStat] = useState('Real Time')

  const titleStatStyle = 'text-[28px] font-bold'
  const statStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid black',
    borderColor: '#E6E6E3',
    paddingRight: '56px',
    marginRight: '56px',
    paddingBottom: '4px',
  }

  const [tags, setTags] = useState<string[]>([])

  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')

  const tiktokPosts = posts.filter(post => post.platform === 'tiktok')
  const [activeSocial, setActiveTab] = useState('All')

  const filteredPosts = campaign?.posts?.filter(post => {
    const isInstagramActive = activePlatforms.includes('Instagram')
    const isFilterActive = activePlatforms.length > 0

    const allowedPlatforms =
      activeSocial === 'Instagram'
        ? ['instagram']
        : activeSocial === 'TikTok'
          ? ['tiktok']
          : ['tiktok', 'instagram']

    if (
      allowedPlatforms.includes(post.platform || '') &&
      (!isFilterActive || (isFilterActive && isInstagramActive)) &&
      (creatorsSelecteds.length === 0 ||
        creatorsSelecteds.some(creator => creator.id == post.creator?.id)) &&
      (tags.length === 0 ||
        post.caption?.split(' ').some(tag => tags.includes(tag)))
    ) {
      if (activeButton === 'most') {
        if (post.reachCount && post.reachCount > 0) {
          return true
        }
      } else if (activeButton === 'topPerforming') {
        if (post.engagementCount && post.reachCount && post.reachCount > 0) {
          const ratio = (post.engagementCount / post.reachCount) * 100
          return ratio > 0
        }
      } else {
        return true
      }
    }

    return false
  })

  const descriptionStatStyle = 'text-sm'

  return (
    <>
      <div className='relative'>
        <Image
          className='w-full  max-h-44 object-cover'
          src={campaign.coverImg || coverImageClient}
          alt=''
          width={1660}
          height={160}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#ffffff] to-transparent max-h-44'></div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full overflow-hidden'>
          {/* title */}
          <div className='flex w-full justify-between items-center px-12 my-12'>
            <h4 className='text-3xl font-medium'>{campaign.name}</h4>
            <div className='flex gap-4 items-center'>
              <div className='mask mask-circle h-12 w-12'>
                <Image
                  priority
                  className={``}
                  width={100}
                  height={100}
                  src={avatar}
                  alt='background'
                />
              </div>
              <div>
                <p className='font-semibold text-base'>
                  {user?.name || 'Agency'}
                </p>
                <p className='font-light text-xs'>agency</p>
              </div>
            </div>
          </div>

          {/* stats */}
          <div className='mx-12 flex rounded-xl border my-12'>
            <div className='w-1/4 p-8 flex flex-col gap-8'>
              <h4 className='text-2xl font-medium'>Results</h4>
              <div className='flex-gap-8'>
                <div className='pb-5'>
                  <p
                    className={`flex items-center gap-1 text-sm pb-1 ${ptMono.className}`}>
                    <FaUserAlt style={{ width: '12px', opacity: '35%' }} />
                    {'creators'}
                  </p>
                  <h5 className='text-2xl font-medium'>{creators.length}</h5>
                </div>
                <div>
                  <p
                    className={`flex items-center gap-1 text-sm pb-1 ${ptMono.className}`}>
                    <FaClone style={{ width: '12px', opacity: '35%' }} />
                    {'posts'}
                  </p>
                  <h5 className='text-2xl font-medium'>
                    {campaign?.posts?.length}
                  </h5>
                </div>
              </div>
            </div>
            <div className='w-3/4 bg-[#FAF9F8]'>
              <Tab.Group>
                <Tab.List
                  className={`flex gap-6 border-b-[#E4E3E2] border-b pt-4`}>
                  <Tab
                    className={` ml-2 md:ml-12 p-2 text-base font-medium outline-none ${typeStat === 'Real Time'
                      ? 'border-b-4 border-[#7E7E7D]'
                      : 'opacity-50'
                      }`}
                    onClick={() => setTypeStat('Real Time')}>
                    Real Time
                  </Tab>
                  <Tab
                    className={` ml-2 md:ml-12 p-2 text-base font-medium outline-none ${typeStat === 'Predicted'
                      ? 'border-b-4 border-[#7E7E7D]'
                      : 'opacity-50'
                      }`}
                    onClick={() => setTypeStat('Predicted')}>
                    Predicted
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <div className='grid grid-rows-2 grid-flow-col justify-start pl-12'>
                      {statsNormal
                        ?.find((section: any) => section.section === 'private')
                        ?.data.map(
                          (stat: any, index: number, statArray: any) => {
                            let dynamicStyle = { ...statStyle }

                            if (index > 1) {
                              dynamicStyle.borderRight = 'none'
                              dynamicStyle.marginRight = '0px'
                            }

                            if (index === 8 || index === 9) {
                              dynamicStyle.borderLeft = '1px solid #E6E6E3'
                              dynamicStyle.paddingLeft = '56px'
                            }

                            // Determine if this is one of the last two stats
                            const isLastTwo = index >= statArray.length - 2
                            const textClasses = `${descriptionStatStyle} ${isLastTwo ? 'text-[#81cca8]' : ''
                              } ${ptMono.className}`

                            return (
                              <div key={index}>
                                {index != 0 && index != 1 && (
                                  <div
                                    key={index}
                                    style={dynamicStyle}
                                    className='my-4'>
                                    <h4 className={`${titleStatStyle} ${isLastTwo ? 'text-[#81cca8]' : ''}`}>
                                      {stat.title}
                                    </h4>
                                    <p className={`text-[14px] ${ptMono.className} ${textClasses}`}>{stat.description}</p>
                                  </div>
                                )}
                              </div>
                            )
                          },
                        )}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className='bg-[#FAF9F8] pl-12 h-full'>
                      <p className='pt-5 pb-3'>
                        {`Codecoco's prediction for the upcoming month: this
estimate uses a linear growth method based on the`}{' '}
                        <br />
                        {`current performance of the creators and their content.`}
                      </p>
                      <div className='flex'>
                        {statsPredicted.map((stat: any, index: number) => {
                          let dynamicStyle = { ...statStyle }
                          dynamicStyle.borderRight = 'none'

                          return (
                            <div
                              key={index}
                              style={dynamicStyle}
                              className='py-4 h-full'>
                              <h4 className={`${titleStatStyle}`}>
                                {stat.title}
                              </h4>
                              <p className={`text-[14px] ${ptMono.className}`}>
                                {stat.description}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

          <PostsByPlatform
            campaign={campaign}
            id={campaign.id!}
            shared={true}
            creators={creators}
            session={undefined}
            connections={connections}
          />
        </div>
      </div>
    </>
  )
}
