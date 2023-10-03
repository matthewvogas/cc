import InstagramData from '@/app/dashboard/socialData/instagramData'
import PostCard from '../cards/influencer/posts/postCard'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'
import { instagramPages } from '@prisma/client'
import Image from 'next/image'

type Props = {
  posts: any
  instagramPages: any
}

type TabItem = {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
}

function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='w-full'>
      <Tab.Group>
        <Tab.List className='flex space-x-16 '>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `relative outline-none inline-block ${
                  selected ? 'text-black  outline-none' : 'opacity-30'
                }`
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

export default function Collect({ posts, instagramPages }: Props) {
  const [instagramPage, setInstagramPage] = useState('')
  const [errorPage, setErrorPage] = useState('')

  const handleLinksSubmit = async () => {
    try {
      if (instagramPage === '') {
        console.log('sin paginas')
        return setErrorPage('You need to select one page, try again')
      } else {
        setErrorPage('')
      }

      const res = await fetch('/api/collectPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instagramPage: instagramPage,
        }),
      })

      if (res.ok) {
      } else {
        console.log(200)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePages = async () => {
    try {
      const res = await fetch('/api/pageList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (res.ok) {
      } else {
        console.log(200)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const tabs: TabItem[] = [
    {
      label: 'Instagram ',
      content: (
        <div className='mt-8'>
          <div className=' justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-32'>
            {posts?.map((post: any, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Tiktok',
      content: <div>{/* <InstagramData /> */}</div>,
    },
  ]

  return (
    <div>
      <div className='flex flex-row justify-between items-center mb-6'>
        <h1 className='font-bold text-2xl'>My social data</h1>
        <div className='p-4 flex gap-4'>
          <div>
            <div className='flex'>
              <p className='mr-4'>{errorPage}</p>
              <button onClickCapture={handlePages}>
                <label
                  htmlFor='my-modal-3'
                  className={`${ptMono.className} rounded-full cursor-pointer border px-8 py-4`}>
                  {'collect'}
                </label>
              </button>
            </div>

            <input type='checkbox' id='my-modal-3' className='  modal-toggle' />
            <div className='modal '>
              <div className='modal-box relative flex max-w-max flex-col justify-start overflow-hidden rounded-xl bg-white  p-0'>
                <label
                  htmlFor='my-modal-3'
                  className='absolute right-4 top-2 cursor-pointer text-lg text-black'>
                  ✕
                </label>

                <div className='px-10 py-8'>
                  <h3 className='text-xl font-bold'>
                    Connect your Instagram Page to Codecoco
                  </h3>

                  <div className={`w-full justify-start `}>
                    <p className={` pb-6 text-xs text-[#7F7F7F] mt-2`}>
                      You can upload the content of your accounts one account at
                      a time
                    </p>

                    <div className='flex flex-col justify-start items-start gap-4'>
                      {instagramPages.map(
                        (page: instagramPages, index: number) => (
                          <button
                            onClick={() => {
                              setInstagramPage(page.id)
                            }}
                            key={index}
                            className={`${
                              instagramPage == page.id ? 'bg-beigeFirst' : ''
                            } flex gap-2 justify-center items-center pl-2 pr-3 py-2 border border-beigeSelected rounded-full hover:bg-beigeFirst`}>
                            <img
                              width={40}
                              height={40}
                              src={page.profile_picture_url}
                              alt={''}
                              className='rounded-full border'
                            />
                            <p>{page.name}</p>
                          </button>
                        ),
                      )}
                    </div>

                    <hr className=' h-px bg-gray-200 my-8'></hr>

                    <div className='text-right'>
                      <button className='cursor-pointer' onClickCapture={handleLinksSubmit}>
                        <label
                          htmlFor='my-modal-3'
                          className={`${ptMono.className} cursor-pointer rounded-xl bg-[#D3F0E2] px-8 py-3`}>
                          {'collect'}
                        </label>
                      </button>
                      <input
                        id='my-input'
                        type='text'
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
