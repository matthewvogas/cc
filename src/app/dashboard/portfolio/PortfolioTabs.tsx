'use client'
import backgroundImage from 'public/assets/creatorRegister/Rectangle66.jpg'
import CampaignsPortfolio from '@/app/dashboard/portfolio/campaignsPortfolio'
import CampaignsAgency from './campaignsAgency'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

type Props = {
  connections: any
  clients: any
  campaigns: any
  instagramPages: any
  tokenIg: any
  portfolio: any
}
export default function PortfolioTabs({
  connections,
  clients,
  campaigns,
  instagramPages,
  tokenIg,
  portfolio,
}: Props) {
  console.log(instagramPages)

  const tabs: TabItem[] = [
    {
      label: 'Portfolios',
      content: (
        <div>
          <CampaignsPortfolio
            connections={connections}
            clients={clients}
            campaigns={campaigns}
            instagramPages={instagramPages}
            tokenIg={tokenIg}
          />
        </div>
      ),
    },
    {
      label: 'With agencies',
      content: (
        <div>
          <CampaignsAgency
            connections={connections}
            clients={clients}
            campaigns={campaigns}
            instagramPages={instagramPages}
          />
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className='relative'>
      <Image
          className='w-full max-h-44 object-cover'
          src={portfolio.imageUrl}
          alt=''
          width={1660}
          height={160}
        />

        <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12 ml-4 -mt-16 z-30'>
          <div className='w-full '>
            <div>
              <div className=''>
                <h1 className='pb-8 align-middle text-2xl font-semibold text-white z-20'>
                {portfolio.portfolioName || `Your Portfolio & Campaigns`}
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
        <Tab.List className='space-x-16 pl-12  border-b-2'>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative  ${
                  selected
                    ? 'font-medium text-brown pb-5 border-b-4 border-[#808080] outline-none text-[#000]'
                    : 'text-[#808080]'
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
