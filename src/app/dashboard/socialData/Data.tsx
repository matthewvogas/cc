'use client'
import { Post } from '@/types/campaign/campaignRes'
import InstagramData from './instagramData'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import SocialCard from './socialCard'
import { ptMono } from '@/app/fonts'
import { Posts } from '@/types/posts/PostByCampaignRes'
import PostCard from '@/components/cards/influencer/posts/postCard'

type Props = {
  posts: any
}

type TabItem = {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
}

function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='w-full'>
      <Tab.Group>
        <Tab.List className='flex p-1 space-x-16 ml-16'>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative p-2${
                  selected
                    ? 'text-brown border-b-2 border-gray-700 outline-none'
                    : 'text-brown'
                } inline-block`
              }
              onClick={() => handleTabClick(index)}>
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className='divider -mt-3' />
      <div className='p-4'>{tabs[activeTab].content}</div>
    </div>
  )
}

export default function SocialData({ posts }: Props) {
  const tabs: TabItem[] = [
    {
      label: 'Instagram ',
      content: (
        <div>
          <InstagramData />
          <div className='mt-10 ml-10'>
            {posts.map((post: any, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Tiktok',
      content: (
        <div>
          <InstagramData />
        </div>
      ),
    },
    {
      label: 'All posts',
      content: (
        <div>
          <InstagramData />
        </div>
      ),
    },
  ]

  return (
    <div>
      <header
        style={{
          background:
            'linear-gradient(180deg, rgba(226, 222, 212, 0.75) 0%, rgba(226, 222, 212, 0.00) 65%)',
        }}
        className='flex flex-row justify-between items-center p-20'>
        <h1 className='font-bold text-2xl'>My social data</h1>
        <div className='p-10'>
          <button
            className={`${ptMono.className} border px-10 py-2.5 rounded-full border-black mr-5`}>
            manage social connection
          </button>
          <button
            className={`${ptMono.className} border px-8 py-2.5 rounded-full border-black -mr-10`}>
            connect to agencies
          </button>
        </div>
      </header>
      <div className='-mt-20'>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
