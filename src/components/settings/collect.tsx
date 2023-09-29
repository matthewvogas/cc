import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'
import InstagramData from '@/app/dashboard/socialData/instagramData'
import PostCard from '../cards/agency/posts/postCard'

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
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='w-full'>
      <Tab.Group>
        <Tab.List className='flex space-x-16 '>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative outline-none inline-block ${
                  selected ? 'text-black  outline-none' : 'opacity-30'
                }`
              }
              onClick={() => handleTabClick(index)}>
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className=''>{tabs[activeTab].content}</div>
    </div>
  )
}

export default function Collect({ posts }: Props) {
  const handleLinksSubmit = async () => {
    try {
      const res = await fetch('/api/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (res.ok) {
      } else {
        console.log(200)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const tabs: TabItem[] = [
    {
      label: 'All posts',
      content: <div></div>,
    },
    {
      label: 'Instagram ',
      content: (
        <div className='mt-8'>
          <div className=' justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
            {posts?.map((post: any, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Tiktok',
      content: <div>{/* <InstagramData /> */}</div>,
    },
  ]

  return (
    <div>
      <div className='flex flex-row justify-between items-center mb-6'>
        <h1 className='font-bold text-2xl'>My social data</h1>
        <div className='p-4 flex gap-4'>
          <button
            onClick={handleLinksSubmit}
            className={`${ptMono.className} border px-8 py-2.5 rounded-full border-black`}>
            collect data
          </button>
          <Link
            href={'/dashabord/agencies'}
            className={`${ptMono.className} border px-8 py-2.5 rounded-full border-black`}>
            connect to agencies
          </Link>
        </div>
      </div>
      <div className=''>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
