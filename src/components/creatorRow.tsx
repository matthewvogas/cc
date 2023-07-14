'use client'

import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import avatar from 'public/assets/register/avatar.jpg'
import { PostHashtagStatus, type ChipStateName } from './postHashtagStatus'
import { CreatorStatus } from './creatorStatus'
import { SetStateAction, useState } from 'react'
import { Dialog, Tab } from '@headlessui/react'
import TagsInput from './TagsInput'
import modalCover from 'public/assets/register/addpostToTrack.jpg'
import { CreatorsByCampaignRes } from '@/types/creators/CreatorsByCampaignRes'

const dropdownButton =
  'text-sm border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:bg-transparent hover:border-orange-100'
const thTable = 'bg-white text-sm normal-case '
const infoLabel = 'bg-active px-8 py-3 rounded-full text-black text-sm '

export default function CreatorRow(props: {
  comeFrom: string
  creators: CreatorsByCampaignRes
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  return (
    <>
      <div className='my-5 h-screen w-full md:px-12'>
        <table className='table w-full'>
          <thead className=' border-b border-gray-200'>
            <tr>
              {props.comeFrom === 'campigns' && (
                <>
                  <th className={`${thTable} ${ptMono.className}`}>creator</th>
                  <th className={`${thTable} ${ptMono.className}`}>status</th>
                  <th className={`${thTable} ${ptMono.className}`}>
                    posts assigned
                  </th>
                  <th className={`${thTable} ${ptMono.className}`}>
                    post status
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className={`text-sm ${ptMono.className} `}>
              {props.comeFrom === 'campigns' && (
                <>
                  <td className='bg-white'>
                    <div className={`flex items-center space-x-3 `}>
                      <div className='avatar'>
                        <div className='mask mask-circle mr-8 h-12 w-12'>
                          <Image
                            priority
                            className={``}
                            width={100}
                            height={100}
                            src={avatar}
                            alt='background'
                          />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>Name</div>
                        <div className='text-sm opacity-50'>
                          mail@hotmail.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='bg-white'>
                    <CreatorStatus state={'SIGNEDUP'} />
                  </td>
                  <td className='bg-white'>
                    <div className='flex items-center justify-between '>
                      <div className='flex'>
                        <label className={`${infoLabel}`}>2 posts</label>
                        <button className='px-2 text-lg font-bold text-gray-400'>
                          {' '}
                          +{' '}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className='flex'>
                    <PostHashtagStatus state={'NOT'} link={''} />
                  </td>
                  <td>
                    <div className='dropdown-end dropdown cursor-pointer'>
                      <svg
                        tabIndex={0}
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-6 w-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                        />
                      </svg>
                      <ul
                        tabIndex={0}
                        className='dropdown-content menu rounded-box w-max  border-2 border-gray-100 bg-white p-2'>
                        <button
                          onClick={() => setIsOpen(true)}
                          className={`${dropdownButton}`}>
                          add post tracking 🥥
                        </button>
                        <button className={`${dropdownButton}`}>
                          View Creator
                        </button>
                        <button className={`${dropdownButton}`}>
                          Remove creator
                        </button>
                      </ul>
                    </div>
                  </td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-[99]'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel
            className={`flex w-full max-w-xl flex-col rounded-xl bg-white  `}>
            <Image src={modalCover} className='rounded-t-xl' alt={''} />
            <Dialog.Title className=' text-lg font-medium mb-8 text-center'>
              Automatically track when your creators post 🥥
            </Dialog.Title>

            <Tab.Group>
              <Tab.List
                className={`flex flex-row items-center justify-center gap-6 ${ptMono.className}`}>
                <Tab
                  className={({ selected }) =>
                    ` rounded-3xl border-2 border-primary px-12 py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  add manually
                </Tab>

                <Tab
                  className={({ selected }) =>
                    `rounded-3xl border-2 border-primary px-8  py-2 ${
                      selected ? 'bg-primary' : ''
                    }`
                  }>
                  upload from file
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div className='divider px-8'></div>
                  <div className='flex gap-4  px-7 justify-between mb-4'>
                    <div className='w-full'>
                      <p className='text-sm font-semibold'>Assign to creator</p>
                      <select
                        className='w-full mt-4 rounded-xl border border-gray-300 bg-gray-50 pl-4 py-3 text-sm text-gray-900 flex-grow bg-transparent outline-none'
                        name=''
                        id=''></select>
                    </div>
                    <div className='w-full'>
                      <p className='text-sm font-semibold'>
                        Hashtag(s) your creator will use
                      </p>
                      <TagsInput tags={tags} setTags={setTags} />
                    </div>
                  </div>
                  <div className='flex w-full flex-col justify-end items-end px-7 mb-6'>
                    <span className='text-xs italic font-light mb-4'>
                      separate multiple with a enter
                    </span>
                    <button
                      className={`px-9 py-3 bg-green-200 ${ptMono.className} rounded-full`}>
                      start tracking
                    </button>
                  </div>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <div className=' w-full mx-9 my-9 flex justify-center'>
                    <input
                      name='campaignExcel'
                      id='campaignExcel'
                      type='file'
                      accept='.xlsx, .xls'
                      className=''
                    />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
