import InstagramData from '@/app/dashboard/socialData/instagramData'
import PostCard from '../cards/influencer/posts/postCard'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'
import { instagramPages } from '@prisma/client'
import Image from 'next/image'
import Spinner from '../loading/spinner'
import { useRouter } from 'next/navigation'

type Props = {
  session: any
  posts: any
  instagramPages: any
  tiktokPages: any
  instgramToken: any
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

export default function Collect({
  session,
  posts,
  instagramPages,
  tiktokPages,
  instgramToken,
}: Props) {
  const [loading, setLoading] = React.useState(false)
  const [instagramPage, setInstagramPage] = useState('')
  const [tiktokPage, setTiktokPage] = useState('')
  const [errorPage, setErrorPage] = useState('')

  const router = useRouter()

  const handleLinksSubmit = async () => {
    setLoading(true)
    try {
      if (instagramPage === '') {
        console.log('sin paginas')
        return setErrorPage('You need to select one page, try again')
      } else {
        setErrorPage('')
      }

      const res = await fetch('/api/collect/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instagramPage: instagramPage,
          instgramToken: instgramToken,
          sessionId: session.user.id,
        }),
      })

      if (res.ok == true) {
        setLoading(false)
        router.refresh()
      } else {
        console.log(200)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const tabs: TabItem[] = [
    {
      label: 'Instagram',
      content: (
        <div className='mt-8'>
          <div className=' justify-start grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2  2xl:grid-cols-5 gap-y-2 pb-48'>
            {loading ? (
              <Spinner width='w-4' height='h-4' border='border-2' />
            ) : null}
            {posts?.map((post: any, index: any) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      ),
    },
    // {
    //   label: 'Tiktok',
    //   content: <div>{/* <InstagramData /> */}</div>,
    // },
  ]

  return (
    <div>
      <div className='flex flex-row justify-between items-center mb-6'>
        <h1 className='font-bold text-2xl'>My social data</h1>
        <div className='p-4 flex gap-4'>
          <div>
            <div className='flex'>
              <p className='mr-4'>{errorPage}</p>
              <label
                htmlFor='my-modal-3'
                className={`${ptMono.className} rounded-full cursor-pointer border px-8 py-4`}>
                {'collect'}
              </label>
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
                    Facebook - Instagram Accounts Associate
                  </h3>

                  <div className={`w-full justify-start `}>
                    <p className={` pb-6 text-xs text-[#7F7F7F] mt-2`}>
                      You can upload the content of your accounts one account at
                      a time, reload the page if you don&apos;t see new pages.{' '}
                      <br />
                      <span className='font-semibold'>
                        {' '}
                        If the page has less than 100 followers. It will not
                        appear on the list.
                      </span>
                    </p>

                    <div className='flex flex-col justify-start items-start gap-4'>
                      {loading ? (
                        <Spinner width='w-4' height='h-4' border='border-2' />
                      ) : instagramPages.length > 0 ? (
                        instagramPages.map(
                          (page: instagramPages, index: number) =>
                            parseInt(page.followers_count) > 100 && (
                              <button
                                onClick={() => {
                                  setInstagramPage(page.id)
                                }}
                                key={index}
                                className={`${
                                  instagramPage == page.id
                                    ? 'bg-[#997e5a] border-[#997e5a] text-white'
                                    : ''
                                } flex gap-2 justify-center items-center pl-3 pr-3 py-2 border border-beigeSelected rounded-full hover:bg-[#997e5a] hover:text-white`}>
                                <p>
                                  @{page.username} - {page.followers_count}{' '}
                                  Followers
                                </p>
                              </button>
                            ),
                        )
                      ) : (
                        <div>
                          <p className='font-normal text-sm text-gray-600'>
                            There are no pages available, connect your pages
                            within the Connections section
                          </p>
                        </div>
                      )}
                    </div>

                    <hr className=' h-px bg-gray-200 my-8'></hr>

                    <h3 className='text-xl font-bold'>
                      TikTok Accounts Associate
                    </h3>

                    <div className='pt-6 pb-6 flex flex-col justify-start items-start gap-4'>
                      {loading ? (
                        <Spinner width='w-4' height='h-4' border='border-2' />
                      ) : tiktokPages.length > 0 ? (
                        tiktokPages.map((page: any, index: number) =>(
                          <button
                            onClick={() => {
                              setTiktokPage(page.id)
                            }}
                            key={index}
                            className={`${
                              tiktokPage == page.id
                                ? 'bg-[#997e5a] border-[#997e5a] text-white'
                                : ''
                            } flex gap-2 justify-center items-center pl-3 pr-3 py-2 border border-beigeSelected rounded-full hover:bg-[#997e5a] hover:text-white`}>
                            <p>
                              @{page.username} - {page.followers_count}{' '}
                              Followers
                            </p>
                          </button>
                        ))
                      ) : (
                        <div>
                          <p className='font-normal text-sm text-gray-600'>
                            There are no pages available, connect your pages
                            within the Connections section
                          </p>
                        </div>
                      )}
                    </div>

                    <div className='text-right'>
                      {instagramPage.length > 0 ? (
                        <div>
                          <button
                            className='cursor-pointer'
                            onClickCapture={handleLinksSubmit}>
                            <label
                              htmlFor='my-modal-3'
                              className={`${ptMono.className} cursor-pointer rounded-xl bg-[#D3F0E2] px-8 py-3`}>
                              {'collect'}
                            </label>
                          </button>
                        </div>
                      ) : (
                        <button
                          disabled
                          className='cursor-not-allowed ${ptMono.className} cursor-pointer rounded-xl border-gray-200 bg-[#e9e9e9] px-8 py-3'
                          onClickCapture={handleLinksSubmit}>
                          {'collect'}
                        </button>
                      )}
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
