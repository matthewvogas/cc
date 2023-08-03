'use client'

import ManagePosts from '@/components/ManagePosts'
import OverviewCampaignPublic from '@/components/overviewCampaignPublic'
import PostCard from '@/components/postCard'
import TitleDashboard from '@/components/titleDashboard'
import { CampaignRes } from '@/types/campaign/campaignRes'
import React from 'react'
import { useEffect, useState } from 'react'
import { ptMono } from '@/app/fonts'

export function SharedCampaign({ campaign }: { campaign: CampaignRes }) {
  const [tags, setTags] = useState<string[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')

  const filteredPosts = campaign?.posts?.filter(post => {
    if (!post.caption) return false

    const isInstagramActive = activePlatforms.includes('Instagram')
    const isFilterActive = activePlatforms.length > 0

    if (
      (!isFilterActive || (isFilterActive && isInstagramActive)) &&
      (tags.length === 0 ||
        post.caption.split(' ').some(tag => tags.includes(tag)))
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
      <div className='mt-14 mb-12 md:mb-14 w-full  px-6 md:px-14'>
        <h2 className={`text-2xl text-black`}>{campaign.name}</h2>
      </div>

      <div className='w-full  '>
        <OverviewCampaignPublic
          creators={campaign?._count?.creators || 0}
          content={campaign?._count?.posts || 0}
          audience={campaign?.stats?.impressionsCount || 0}
          plays={campaign?.stats?.playsCount || 0}
        />

        <ManagePosts
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
          mostView={activeButton}
        />

        <div className='flex pt-6'>
          <div className='mb-12 ml-12 flex flex-wrap gap-x-6 gap-y-8 self-center'>
            {filteredPosts?.map((post, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
