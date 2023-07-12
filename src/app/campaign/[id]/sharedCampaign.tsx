'use client'

import ManagePosts from '@/components/ManagePosts'
import OverviewCampaignPublic from '@/components/overviewCampaignPublic'
import PostCard from '@/components/postCard'
import TitleDashboard from '@/components/titleDashboard'
import { Campaign, CampaignPayload, Client, User, Post } from '@prisma/client'
import React from 'react'
import { useEffect, useState } from 'react'

export interface NewType {
  id: number
  campaign: Partial<
    Campaign & {
      user: User
      client: Client
      posts: Post[]
      _count: {
        creators?: number
        posts?: number
      }
    }
  > | null
}

export function SharedCampaign({ campaign, id }: NewType) {
  const [tags, setTags] = useState<string[]>([])
  const [creatorsSelecteds, setCreatorsSelecteds] = useState<any[]>([])
  const [activePlatforms, setActivePlatforms] = useState<any[]>([])
  const [activeButton, setActiveButton] = useState('galleryView')

  const filteredPosts = campaign?.posts?.filter((post: Post) => {
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
    <div className='flex flex-col items-center justify-center'>
      <TitleDashboard title={'Revolve Clothing'} user={''} />
      <div className='w-[1480px]  pt-6 '>
        <OverviewCampaignPublic
          creators={1}
          content={campaign?._count?.posts || 0}
          audience={1}
          plays={1}
        />
        <ManagePosts
          id={id}
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
            {filteredPosts?.map((post: Post, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
