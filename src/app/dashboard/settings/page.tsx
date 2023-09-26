'use client'
import TwoTabsComponent from '@/components/settings/Twotabs'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import Connections from '@/components/settings/Connections'

export default function Settings() {
  const tabs: TabItem[] = [
    {
      label: 'My social data',
      content: <div>{`My social Data`}</div>,
    },
    {
      label: 'Account Settings',
      content: (
        <div>
          <TwoTabsComponent />
        </div>
      ),
    },
    {
      label: 'Portfolio',
      content: <div>{`Coming soon...`}</div>,
    },
    {
      label: 'Connections',
      content: (
        <div>
          <Connections/>
        </div>
      ),
    },
    {
      label: 'Subscription',
      content: <div>{`Contenido de la pestaña "Subscription"`}</div>,
    },
  ]

  return (
    <div>
      <div
        
        className='w-full pt-20 relative z-30'>
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
                  selected
                    ? 'text-brown  outline-none'
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
      <div className='px-12'>{tabs[activeTab].content}</div>
    </div>
  )
}
