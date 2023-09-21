'use client'
import TwoTabsComponent from '@/components/settings/Twotabs'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Connections from '@/components/settings/Connections'
import backgroundImage from 'public/assets/creatorRegister/Rectangle66.jpg'
import Image from 'next/image'
import CampaignsPortfolio from '@/app/dashboard/portfolio/campaignsPortfolio'

export default function PerformingContent() {
  const tabs: TabItem[] = [
    {
      label: 'All Stats',
      content: <div></div>,
    },
    {
      label: 'Instagram',
      content: <div>{`Campaigns + Brands`}</div>,
    },
    {
      label: 'Tiktok',
      content: <div>{`Campaigns + Brands`}</div>,
    },
  ]

  return (
    <div>
      <h2 className='font-bold text-2xl p-10'>
        Explore top performing content
      </h2>
      <Tabs tabs={tabs} />
    </div>
  )
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
      <div className='w-full '>
        <Tab.Group>
          <Tab.List className='flex -mt-8 p-1 border-b-2 border-[#E1DEDB] space-x-16 pl-12 pt-8'>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `relative p-2${
                    selected
                      ? 'text-brown -mb-[6px] border-b-2 font-semibold border-gray-700 outline-none'
                      : 'text-brown'
                  } inline-block`
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
}
