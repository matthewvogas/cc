'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Posts } from '@/types/posts/PostByCampaignRes'
import { CampaignRes } from '@/types/campaign/campaignRes'
import OverviewCampaignPublic from '@/components/overviewCampaignPublic'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'
import Stats from '@/components/stats'
import avatar from 'public/assets/register/avatar.jpg'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { FaUserAlt, FaClone } from 'react-icons/fa'
import PostsByPlatform from '@/components/postsByPlatform'

export function SharedCampaign({
  user,
  campaign,
  posts,
  creators,
}: {
  user: any
  campaign: CampaignRes
  posts: Posts[]
  creators: CreatorsByCampaignRes[]
}) {
  const stats = [
    {
      section: 'private',
      data: [
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

  return (
    <div className='  flex flex-col items-center justify-center'>
      <div className='w-full overflow-hidden'>
        {/* title */}
        <div className='flex w-full justify-between items-center px-12 my-12'>
          <h4 className='text-3xl font-medium'>{campaign.name}</h4>

          {/* <div className='flex gap-4 items-center'>
            <div className=' mask mask-circle h-12 w-12'>
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
              <p className='font-semibold text-base'>{user?.name || 'Agency'}</p>
              <p className='font-light text-xs'>agency</p>
            </div>
          </div> */}
        </div>

        {/* stats */}
        {/* <div className='mx-12 flex rounded-xl border my-12'>
          <div className='w-1/4 p-8 flex flex-col gap-8'>
            <h4 className='text-2xl font-medium'>Results</h4>
            <div className='flex gap-8'>
              <div>
                <p
                  className={`flex items-center gap-1 text-sm pb-1 ${ptMono.className}`}>
                  {' '}
                  <FaUserAlt style={{ width: '12px', opacity: '35%' }} />{' '}
                  creators{' '}
                </p>
                <h5 className='text-2xl font-medium'>{creators.length}</h5>
              </div>
              <div>
                <p
                  className={`flex items-center gap-1 text-sm pb-1 ${ptMono.className}`}>
                  {' '}
                  <FaClone
                    style={{ width: '12px', opacity: '35%' }}
                  /> posts{' '}
                </p>
                <h5 className='text-2xl font-medium'>
                  {campaign.posts?.length}
                </h5>
              </div>
            </div>
          </div>
          <div className='w-3/4'>
            <Stats
              campaignsFallback={[]}
              clientsFallback={undefined}
              stats={stats}
              frome={'shareCampaign'}
              userPositionId={0}
            />
          </div>
        </div> */}

        {/* <OverviewCampaignPublic
          creators={campaign?._count?.creators || 0}
          content={campaign?._count?.posts || 0}
          audience={campaign?.stats?.impressionsCount || 0}
          plays={campaign?.stats?.playsCount || 0}
        /> */}

        <PostsByPlatform
          campaign={campaign}
          id={campaign.id!}
          shared={true}
          creators={creators}
        />
      </div>
    </div>
  )
}
