import React, { useState } from 'react'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
type Props = {
  tabs: any[]
}
function CustomTabs({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveTab(index)
  }

  return (
    <div className='flex flex-row mt-10'>
      <div className='flex flex-col text-start ml-12 w-56 rounded-lg font-semibold'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-3 ${
              activeTab === index
                ? 'text-brown bg-greenCTA rounded-md bg-opacity-50'
                : 'text-brown'
            } inline-block cursor-pointer`}
            onClick={() => handleTabClick(index)}>
            {tab.label}
          </div>
        ))}
      </div>
      <div className='p-4 ml-10 -mt-8 w-full mr-20'>
        {tabs[activeTab].content}
      </div>
    </div>
  )
}

export default function Subscription() {
  const tabs = [
    {
      label: 'Your plan',
      content: (
        <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
          <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
            <h1 className='font-semibold text-xl'>Profile Settings</h1>
            <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
              save
            </button>
          </div>
          <div className='divider'></div>
          <div className='flex flex-row items-center'>
            <span>Yes 🥥</span>
            <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
              upgrade
            </button>
            <div className=''>
              <span className={`${ptMono.className}`}>$14.99/month</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Payment Methods',
      content: <div></div>,
    },
  ]
  return (
    <div>
      <CustomTabs tabs={tabs} />
    </div>
  )
}
