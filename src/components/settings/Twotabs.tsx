import React, { useState } from 'react'
import img from '/public/assets/creatorRegister/exampleImage.jpg'
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

export default function Settings() {
  const tabs = [
    {
      label: 'Profile Settings',
      content: (
        <div className='bg-background rounded-lg bg-opacity-20'>
          <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
            <h1 className='font-semibold text-xl'>Profile Settings</h1>
            <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
              save
            </button>
          </div>
          <div className='divider -mt-5'></div>

          <div className='flex flex-row items-center gap-10'>
            <div className='flex flex-col p-10 -mt-10 '>
              <div className='mask mask-circle'>
                <Image
                  priority
                  className={``}
                  width={180}
                  height={180}
                  src={img}
                  alt='background'
                />
              </div>
              <button className='bg-greenCTA -mt-3 z-10 self-center rounded-full px-8 py-1.5'>
                edit
              </button>
            </div>
            <div className='flex flex-col gap-4 '>
              <input
                type='text'
                placeholder='Name'
                className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40`}
              />
              <input
                type='text'
                placeholder='Email'
                className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40`}
              />
              <input
                type='text'
                placeholder='Username'
                className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40`}
              />
              <span className='text-[#99A09D] ml-2'>Password-Info</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Notifications',
      content: <div>Contenido de la pestaña 2.</div>,
    },
    // Agrega más pestañas según sea necesario
  ]

  return (
    <div>
      <CustomTabs tabs={tabs} />
    </div>
  )
}
