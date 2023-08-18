'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Posts } from '@/types/posts/PostByCampaignRes'
import { CampaignRes } from '@/types/campaign/campaignRes'
import OverviewCampaignPublic from '@/components/overviewCampaignPublic'
import ButtonsGroupTabsSocial from '@/components/socialPostsPlatform'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'

export function SharedCampaign({
  campaign,
  posts,
  creators,
}: {
  campaign: CampaignRes
  posts: Posts[]
  creators: CreatorsByCampaignRes[]
}) {
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
      <div className='w-full mt-8 overflow-hidden'>
        {/* stats */}

        {/* <OverviewCampaignPublic
          creators={campaign?._count?.creators || 0}
          content={campaign?._count?.posts || 0}
          audience={campaign?.stats?.impressionsCount || 0}
          plays={campaign?.stats?.playsCount || 0}
        /> */}

        <ButtonsGroupTabsSocial
          filteredPosts={filteredPosts}
          activeSocial={activeSocial}
          setActiveSocial={setActiveTab}
          campaign={campaign}
          tiktokPosts={tiktokPosts}
          id={campaign.id!}
          addPost={''}
          shared={true}
          tags={tags}
          setTags={setTags}
          creators={creators}
          creatorsSelecteds={creatorsSelecteds}
          setCreatorsSelecteds={setCreatorsSelecteds}
          activePlatforms={activePlatforms}
          setActivePlatforms={setActivePlatforms}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
      </div>
    </div>
  )
}
