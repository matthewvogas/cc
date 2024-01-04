'use client'
import CreatorsPortfolio from '@/components/settings/CreatorsPortfolio'
import Subscription from '@/components/settings/Subscription'
import TwoTabsComponent from '@/components/settings/Twotabs'
import Connections from '@/components/settings/Connections'
import Collect from '@/components/settings/collect'
import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { User } from '@prisma/client'

type Props = {
  user: User | null
  session: any
  posts: any
  stories: any
  instagramPages: any
  tiktokPages: any
  instgramToken: any
  instagramConnection: any
  tiktokConnection: any
  tiktokToken: any
  portfolio: any
}

export default function Settings({
  user,
  session,
  posts,
  stories,
  instagramPages,
  tiktokPages,
  instgramToken,
  instagramConnection,
  tiktokConnection,
  tiktokToken,
  portfolio,
}: Props) {
  const tabs: TabItem[] = [
    {
      label: 'Account Settings',
      content: (
        <div>
          <TwoTabsComponent tabs={[]} session={session} user={user} />
        </div>
      ),
    },
    {
      label: 'Connections',
      content: (
        <div>
          <Connections
            session={session}
            instagramPages={instagramPages}
            tiktokPages={tiktokPages}
            InstagramConnection={instagramConnection}
            tiktokConnection={tiktokConnection}
          />
        </div>
      ),
    },
    {
      label: 'Subscription',
      content: (
        <div>
          <Subscription />
        </div>
      ),
    },
  ]

  if (session.user.role === 'CREATOR') {
    tabs.push(
      {
        label: 'Portfolio',
        content: (
          <div>
            <CreatorsPortfolio session={portfolio} />
          </div>
        ),
      },
      {
        label: 'My data',
        content: (
          <div>
            <Collect
              session={session}
              posts={posts}
              stories={stories}
              instagramPages={instagramPages}
              tiktokPages={tiktokPages}
              instgramToken={instgramToken}
              tiktokToken={tiktokToken}
            />
          </div>
        ),
      }
    )
  }

  return (
    <div>
      <div className='w-full pt-20 relative z-30'>
        <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
          <div className='w-full'>
            <div>
              <div>
                <h3 className='pb-8 align-middle text-2xl font-semibold text-gray-800'>
                  Your account
                </h3>
              </div>
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
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
        <Tab.List className=' space-x-16 pl-12  border-b-2 '>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative ${
                  selected ? 'font-medium text-brown pb-5 border-b-4 border-[#808080] outline-none text-[#000]' : ' text-[#808080]'
                } inline-block pb-6 `
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
