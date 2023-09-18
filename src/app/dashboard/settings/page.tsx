'use client'
import React, { useState } from 'react'
import { Tab } from '@headlessui/react'

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
                    ? 'text-brown border-b-2 border-gray-700'
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

export default function Settings() {
  const accountTabs: TabItem[] = [
    {
      label: 'Account Tab 1',
      content: (
        <div>
          {/* Contenido de la primera pestaña en "Account Settings" */}
          Contenido de la primera pestaña en "Account Settings".
        </div>
      ),
    },
    {
      label: 'Account Tab 2',
      content: (
        <div>
          {/* Contenido de la segunda pestaña en "Account Settings" */}
          Contenido de la segunda pestaña en "Account Settings".
        </div>
      ),
    },
  ]
  const tabs: TabItem[] = [
    {
      label: 'Account Settings',
      content: (
        <div className='flex space-x-10'>
          <div className='flex flex-col ml-10 start-1 '>
            {/* Tab components */}
            <button className='bg-greenCTA p-4 px-8 mb-8 rounded-lg'>
              Profile settings
            </button>

            <button className='bg-greenCTA p-4 px-8 mb-8 rounded-lg'>
              Notifications
            </button>
          </div>
          <div className='flex'>
            <div>EXAMPLE TEXT</div>
          </div>
        </div>
      ),
    },
    {
      label: 'Portfolio',
      content: (
        <div>
          {/* Contenido de la pestaña "Portfolio" */}
          Contenido de la pestaña "Portfolio".
        </div>
      ),
    },
    {
      label: 'Connections',
      content: (
        <div>
          {/* Contenido de la pestaña "Connections" */}
          Contenido de la pestaña "Connections".
        </div>
      ),
    },
    {
      label: 'Subscription',
      content: (
        <div>
          {/* Contenido de la pestaña "Subscription" */}
          Contenido de la pestaña "Subscription".
        </div>
      ),
    },
  ]

  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(226, 222, 212, 0.75) 0%, rgba(226, 222, 212, 0.00) 65%)',
      }}
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
  )
}
