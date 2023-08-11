'use client'

import OverviewCampaignPublic from '@/components/overviewCampaignPublic'
import { CampaignRes } from '@/types/campaign/campaignRes'
import React from 'react'
import { Posts } from '@/types/posts/PostByCampaignRes'
import { useEffect, useState } from 'react'

import ButtonsGroupTabs2 from '@/components/socialPostsPlatform'

export function SharedCampaign({
  campaign,
  posts,
}: {
  campaign: CampaignRes
  posts: Posts[]
}) {
  const [tags, setTags] = useState<string[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')

  const tiktokPosts = posts.filter(post => post.platform === 'tiktok')
  const filteredPosts = campaign?.posts?.filter(post => {
    const isInstagramActive = activePlatforms.includes('Instagram')
    const isFilterActive = activePlatforms.length > 0

    if (
      (!isFilterActive || (isFilterActive && isInstagramActive)) &&
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
        <OverviewCampaignPublic
          creators={campaign?._count?.creators || 0}
          content={campaign?._count?.posts || 0}
          audience={campaign?.stats?.impressionsCount || 0}
          plays={campaign?.stats?.playsCount || 0}
        />

        <ButtonsGroupTabs2
          campaign={campaign}
          tiktokPosts={tiktokPosts}
          id={campaign.id!}
          addPost={''}
          shared={true}
          title={''}
          tags={tags}
          setTags={setTags}
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
