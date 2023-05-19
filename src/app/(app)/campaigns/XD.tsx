'use client'

import imageCover from 'public/assets/register/campaignCover.jpg'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { PT_Mono } from 'next/font/google'
import CampaignFilter from '@/components/campaignFilter'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function XD(){
      // Style Variables
  const dropdownButton =
  'text-sm border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:border-orange-100'
const ActionButtonStyle =
  'flex text-sm  border-rose-100 border-2 inline-block py-2.5 px-8 mx-2 text-back font-medium bg-transparent rounded-full  hover:bg-rose-100 cursor-pointer'

// Arrays
const button = [
  {
    label: 'manual',
    action: 'Hello',
  },
  {
    label: 'hashtag',
    action: '',
  },
]

// Arrays
const title = [
  {
    label: 'New Manual Campaign',
  },
  {
    label: 'New Hashtag Campaign',
  },
]
const client = [
  {
    name: "L'Oreal",
    email: 'loreal@lroeal.com',
  },
  {
    name: "Matthew's, Client",
    email: 'loreal@lroeal.com',
  },
  {
    name: "Sophia's Client",
    email: 'loreal@lroeal.com',
  },
]

// Show Arrays
const clients = client.map((client, index) => (
  <option value={index} id='companies-menu' key={index}>
    {client.name}
  </option>
))

//Show Arrays
const buttons = button.map((btn, index) => (
  <button
    key={index}
    className={`${dropdownButton}`}
    onClick={() => setIsOpen(true)}>
    {btn.label}
  </button>
))

const fetcher = (...args) => fetch(...args).then(res => res.json())

const { data, error, mutate,isLoading } = useSWR(
  'http://localhost:3000/api/campaigns',
  fetcher,
)

const [isOpen, setIsOpen] = useState(false)
const [name, setName] = useState('')
const [fetchError, setFetchError] = useState<string | null>(null)

const handleCreate = async () => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        body: JSON.stringify({ name, description: 'test' }),
        headers: { 'Content-Type': 'application/json' },
      })
      setIsOpen(false)
      if (res.status === 200) {
            mutate()
        }
    } catch (error: any) {
      setFetchError(error?.message)
    }
  }

    return (<>
        <div className='flex h-full flex-col gap-4 bg-white'>
          <div className='w-full pt-20 '>
            <div className='mx-auto mb-8 w-full justify-between px-4 md:px-12'>
              <div className='w-full'>
                <h3
                  className={`pb-8 align-middle text-2xl font-semibold text-gray-800 `}>
                  {'Campaigns'}
                </h3>
  
                <div className={`flex items-center justify-between`}>
                  <label
                    className={`rounded-full bg-background px-8 py-1 text-sm text-black ${ptMono.className}`}>
                    Client Name
                  </label>
                  <div className={`flex ${ptMono.className}`}>
                    <CampaignFilter />
                    <button className={`${ActionButtonStyle} `}>
                      view as client
                    </button>
                    <div className='dropdown-end dropdown cursor-pointer'>
                      <label tabIndex={0} className={`${ActionButtonStyle}`}>
                        add new
                        <svg
                          fill='none'
                          viewBox='0 0 26 26'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='text-midBlack ml-4 h-5 w-5'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                          />
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2 border-gray-100 bg-white p-2'>
                        {buttons}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='divider' />
          </div>
          <div className=' flex  flex-wrap gap-4 md:px-12'>
            {data &&
              data.map((card: any, index: any) => (
                <Link
                  href={`/campaigns/${card.id || 1}`}
                  key={index}
                  className='h-80 w-80 border-gray-100 '>
                  <Image
                    priority
                    className={`h-64 object-cover`}
                    src={card.image || imageCover}
                    alt={card.name}
                  />
                  <div className=' bg-white px-2 py-4'>
                    <p className={`text-sm font-medium text-gray-800`}>
                      {card.name}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* Esta es el modal  */}
        <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto flex max-w-sm flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
            <Dialog.Title className='text-lg font-bold'>
              {title[1].label}
            </Dialog.Title>
            <Dialog.Description>
            <div className={`w-full justify-start ${ptMono.className}`}>
              <p className='py-4'>Client</p>
              <select
                id='countries'
                className='block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'>
                <option value={0} disabled>
                  Choose a client
                </option>
                {clients}
              </select>

              <p className='py-4'>Campaign Title</p>
              <input
                onChange={e => setName(e.target.value)}
                type='text'
                id='name'
                placeholder='Campaign Name'
                className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
              />

              <hr className='my-8 h-px border-0 bg-gray-200'></hr>

              {fetchError && (
                <div className='alert alert-error shadow-lg'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 flex-shrink-0 stroke-current'
                      fill='none'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className='text-center'>
                <button
                  onClick={handleCreate}
                  className='rounded-full bg-rose-200 px-6 py-2 '>
                  create project
                </button>
              </div>
            </div>

            </Dialog.Description>

          </Dialog.Panel>
        </div>
      </Dialog>
      </>)
}