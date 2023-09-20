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
        <div>
          <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
            <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
              <h1 className='font-semibold text-xl'>Profile Settings</h1>
              <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
                save
              </button>
            </div>
            <div className='divider -mt-5'></div>

            <div className='flex flex-row items-center gap-10'>
              <div className='flex flex-col p-10 -mt-80 '>
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
              <div className='flex flex-col gap-4 mt-10 '>
                <input
                  type='text'
                  placeholder='Name'
                  className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                />
                <input
                  type='text'
                  placeholder='Email'
                  className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                />
                <input
                  type='text'
                  placeholder='Username'
                  className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                />
                <div className='flex flex-col gap-4 dropdown'>
                  <label tabIndex={0} className='text-[#99A09D] ml-2'>
                    Password-Info
                  </label>
                  <input
                    type='text'
                    placeholder='Current password'
                    className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                  />
                  <input
                    type='text'
                    placeholder='New password'
                    className={`${ptMono.className} text-black placeholder-black rounded-full py-6 pl-8 bg-background px-96 bg-opacity-40 outline-none`}
                  />
                  <div className='divider'></div>
                </div>
                <div className=''>
                  <span className='font-semibold'>Categories</span>
                  <div className='flex flex-row gap-3 mt-5'>
                    <button className='border-2 border-[#E2DED4] rounded-full px-8 py-3 hover:bg-color-[#E2DED4]'>
                      beauty
                    </button>
                    <button className='border-2 border-[#E2DED4] rounded-full px-8 py-3'>
                      fashion
                    </button>
                    <button className='border-2 border-[#E2DED4] rounded-full px-8 py-3 hover:bg-color-[#E2DED4]'>
                      skincare
                    </button>
                    <button className='border-dashed border-2 border-[#859991] rounded-full px-8 py-3'>
                      add
                    </button>
                  </div>
                </div>
                <div>
                  <div className='gap-10 mt-5'>
                    <span className='font-semibold'>Location</span>
                  </div>
                  <div className='flex flex-row gap-20 mt-5'>
                    <div className='flex flex-col gap-2'>
                      <span className='font-semibold'>Country</span>
                      <input
                        className={`${ptMono.className} text-black placeholder-black bg-background bg-opacity-40 outline-none rounded-md py-2 pl-1 px-10`}
                        placeholder='Costa Rica'></input>
                    </div>
                    <div className='flex flex-col gap-2 mb-10'>
                      <span className='font-semibold'>City</span>
                      <input
                        className={`${ptMono.className} text-black placeholder-black bg-background bg-opacity-40 outline-none rounded-md py-2 pl-1 px-10`}
                        placeholder='San Jose'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[#F5F5F5] flex flex-row mr-20 mt-10 justify-between items-center rounded-lg'>
            <div className='flex flex-col p-10'>
              <span className='font-bold text-lg'>Deactivate your account</span>
              <span>Delete your Codecoco account and all data.</span>
            </div>
            <div>
              <button className='border bg-[#FACEBC] p-4 px-8 rounded-full font-semibold mr-10 bg-opacity-40'>
                delete your account
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Notifications',
      content: (
        <div className='bg-background rounded-lg bg-opacity-20 mr-20'>
          <div className='flex flex-row space-x-96 p-10 content-center justify-between items-center'>
            <h1 className='font-semibold text-xl '>Notifications</h1>
            <button className='bg-greenCTA p-4 rounded-full px-10 font-semibold bg-opacity-50'>
              save
            </button>
          </div>
          <div className='divider -mt-5'></div>
          <div className='flex flex-col p-10'>
            <span className='font-bold text-xl mb-8'>
              Let us know what you’d like to be notified about and how
            </span>
            <span className='font-semibold text-lg mb-5'>
              Email for notifications
            </span>
            <div>
              <input
                type='email'
                placeholder='Email'
                className={`${ptMono.className} text-black placeholder-black rounded-full -ml-3 py-6 pl-8 px-80 bg-background bg-opacity-40 outline-none`}
              />
            </div>
          </div>
          <div className='flex flex-col p-10 -mt-10 gap-3'>
            <span className='font-semibold mb-5'>
              Select notifications you want to receive
            </span>
            <div className='flex flex-row gap-3'>
              <input
                type='checkbox'
                name=''
                id=''
                className='accent-[#E2DED4]'
              />
              <span className={`${ptMono.className}`}>
                Product updates from Codecoco team
              </span>
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='checkbox'
                name=''
                id=''
                className='accent-[#E2DED4]'
              />
              <span className={`${ptMono.className}`}>
                New views on your portfolio if private
              </span>
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='checkbox'
                name=''
                id=''
                className='accent-[#E2DED4]'
              />
              <span className={`${ptMono.className}`}>Our newsletter</span>
            </div>
          </div>
        </div>
      ),
    },
    // Agrega más pestañas según sea necesario
  ]

  return (
    <div>
      <CustomTabs tabs={tabs} />
    </div>
  )
}
