'use client'
import CreatorsPortfolio from '@/components/settings/CreatorsPortfolio'
import Subscription from '@/components/settings/Subscription'
import TwoTabsComponent from '@/components/settings/Twotabs'
import Connections from '@/components/settings/Connections'
import Collect from '@/components/settings/collect'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import { User } from '@prisma/client'

type Props = {
  user: User | null
  session: any
  posts: any
  instagramPages: any
  instgramToken: any
  instagramConnection: any
}

export default function Settings({
  user,
  session,
  posts,
  instagramPages,
  instgramToken,
  instagramConnection,
}: Props) {
  const tabs: TabItem[] = [
    {
      label: 'My data',
      content: (
        <div>
          <Collect
            session={session}
            posts={posts}
            instagramPages={instagramPages}
            instgramToken={instgramToken}
          />
        </div>
      ),
    },
    // {
    //   label: 'Account Settings',
    //   content: (
    //     <div>
    //       <TwoTabsComponent tabs={[]} session={session} user={user} />
    //     </div>
    //   ),
    // },
    // {
    //   label: 'Portfolio',
    //   content: (
    //     <div>
    //       <CreatorsPortfolio />
    //     </div>
    //   ),
    // },
    {
      label: 'Connections',
      content: (
        <div>
          <Connections session={session} InstagramConnection={instagramConnection} />
        </div>
      ),
    },
    // {
    //   label: 'Subscription',
    //   content: (
    //     <div>
    //       <Subscription />
    //     </div>
    //   ),
    // },
  ]

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
        <Tab.List className='flex p-1 space-x-16 ml-16 py-6'>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative p-2${
                  selected ? 'text-brown  outline-none' : 'text-brown'
                } inline-block`
              }
              onClick={() => handleTabClick(index)}>
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className='divider -mt-3' />
      <div className='px-12'>{tabs[activeTab].content}</div>
    </div>
  )
}
