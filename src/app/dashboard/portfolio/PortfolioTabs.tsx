'use client'
import TwoTabsComponent from '@/components/settings/Twotabs'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Connections from '@/components/settings/Connections'
import backgroundImage from 'public/assets/creatorRegister/Rectangle66.jpg'
import Image from 'next/image'
import CampaignsPortfolio from '@/app/dashboard/portfolio/campaignsPortfolio'

export default function PortfolioTabs() {
  const tabs: TabItem[] = [
    {
      label: 'Campaigns + Brands',
      content: (
        <div>
          <CampaignsPortfolio />
        </div>
      ),
    },
    {
      label: 'Stats',
      content: <div>{`Campaigns + Brands`}</div>,
    },
    {
      label: 'Content',
      content: <div>{`Campaigns + Brands`}</div>,
    },
  ]

  return (
    <div>
      <div className='relative'>
        <Image
          src={backgroundImage}
          alt='Imagen de fondo'
          layout='responsive'
          objectFit='cover'
        />
        <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12 ml-4 -mt-16'>
          <div className='w-full '>
            <div>
              <div className=''>
                <h1 className='pb-8 align-middle text-2xl font-semibold text-white'>
                  {`Your name's Portfolio`}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} />
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
    <div className='w-full '>
      <Tab.Group>
        <Tab.List className='flex -mt-8 p-1 border-b-2 border-[#E1DEDB] space-x-16 pl-12 pt-8 bg-sidebarBackground'>
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
      <div className='p-4 px-12'>{tabs[activeTab].content}</div>
    </div>
  )
}
