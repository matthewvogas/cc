'use client'
import backgroundImage from 'public/assets/creatorRegister/Rectangle66.jpg'
import CampaignsPortfolio from '@/app/dashboard/portfolio/campaignsPortfolio'
import CampaignsAgency from './campaignsAgency'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

type Props = {
  clients: any
  campaigns: any
  instagramPages: any
  tokenIg: any
}
export default function PortfolioTabs({ clients, campaigns, instagramPages, tokenIg }: Props) {

  console.log(instagramPages)

  const tabs: TabItem[] = [
    {
      label: 'Portfolios',
      content: (
        <div>
          <CampaignsPortfolio clients={clients} campaigns={campaigns} instagramPages={instagramPages} tokenIg={tokenIg}  />
        </div>
      ),
    },
    {
      label: 'With agencies',
      content: (
        <div>
          <CampaignsAgency clients={clients} campaigns={campaigns} instagramPages={instagramPages} />
        </div>
      ),
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
                  {`Your Portfolio & Campaigns`}
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
      <div className=''>{tabs[activeTab].content}</div>
    </div>
  )
}
