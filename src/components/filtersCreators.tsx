'use client'
import { ptMono } from '@/app/fonts'
import { Dialog, Tab } from '@headlessui/react'
import { useState } from 'react'
import React from 'react'
import { Inter } from 'next/font/google'
import AddCreators from './modals/addCreators'
import Link from 'next/link'
import EmailsInput from './EmailInput'

const inter = Inter({ weight: '400', subsets: ['latin'] })

const comment = [
  {
    label:
      'Manually adding creators is to assign posts to their profile and organize them within campaigns. To collect additional stats, invite creators to connect instead. ',
  },
  {
    label: '',
  },
]
// Fonts

// Arrays
const button = [
  {
    label: 'Instagram',
    action: 'Hello',
  },
  {
    label: 'Pinterest',
    action: '',
  },
  {
    label: 'TikTok',
    action: '',
  },
  {
    label: 'Facebook',
    action: '',
  },
]

const count = [
  {
    qty: '10',
    action: '',
  },
  {
    qty: '10-50',
    action: '',
  },
  {
    qty: '50-100',
    action: '',
  },
  {
    qty: '100-500',
    action: '',
  },
]

const campaign = [
  {
    name: "L'Oreal",
    email: 'loreal@lroeal.com',
  },
  {
    name: "Matthew's, Agency",
    email: 'loreal@lroeal.com',
  },
  {
    name: "Sophia's Agency",
    email: 'loreal@lroeal.com',
  },
]

// Show Arrays
const CountButtons = count.map((btn, index) => (
  <button
    key={index}
    className='rounded-full border border-gray-200 bg-white px-6  py-2.5 hover:bg-gray-100'>
    {btn.qty}
  </button>
))

const SocialButtons = button.map((btn, index) => (
  <button
    key={index}
    className='rounded-full bg-beigeFirst px-6 py-2.5 hover:bg-beigeSelected'>
    {btn.label}
  </button>
))

const campaigns = campaign.map((client, index) => (
  <option value={index} key={index}>
    {client.name}
  </option>
))

export default function FilterCreators() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [emails, setEmails] = useState<string[]>([])
  const [linkToShareInvite, setLinkToShareInvite] = useState<string[]>([])

  return (
    <>
      <div className='my-5 flex w-full justify-between md:px-12'>
        <div>
          <div className='dropdown'>
            <label
              tabIndex={0}
              className={`flex cursor-pointer content-center items-center justify-center gap-5 rounded-full border-2 border-gray-200 px-6 py-2 text-gray-500 ${ptMono.className}`}>
              Filter
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

            <div
              tabIndex={0}
              className={`dropdown-content rounded-box mt-2 w-auto border-2 border-gray-100 bg-white ${ptMono.className}`}>
              <div className='p-6'>
                <div className='mb-4 flex flex-row gap-2'>{SocialButtons}</div>
                <label htmlFor=''>Follower count</label>
                <div className='my-4 flex flex-row gap-2'>{CountButtons}</div>
                <label htmlFor=''>Custom range</label>

                <div className='flex gap-4'>
                  <input
                    type='number'
                    placeholder='Type here'
                    className=' my-4 w-full max-w-xs rounded-md bg-beigeFirst p-2 pl-4 text-gray-600'
                  />
                  <input
                    type='number'
                    placeholder='Type here'
                    className=' my-4 w-full max-w-xs rounded-md bg-beigeFirst p-2 pl-4 text-gray-600'
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor=''>By Campaign</label>
                  <select
                    id='countries'
                    className='mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-rose-400 focus:ring-rose-300 '>
                    <option disabled>Choose a Campaign</option>
                    {campaigns}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpen(true)
            }}
            className={`flex rounded-full bg-active px-6 py-3 text-black ${ptMono.className}`}>
            add a creator
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='ml-2 h-6 w-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m6-6H6'
              />
            </svg>
          </button>
        </div>
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
            <Dialog.Title className=' text-lg font-medium mb-8 text-center mt-12'>
              add creators
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
                  invite to connect
                </Tab>
              </Tab.List>
              <Tab.Panels className='mt-2'>
                <Tab.Panel className=''>
                  <div className='px-12 mt-8'>
                    <label className='text-xs text-black opacity-50' htmlFor=''>
                      {comment[0].label}
                    </label>

                    <p
                      className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                      Search for a creator
                    </p>
                    <input
                      type='text'
                      id='default-input'
                      placeholder='search Codecoco database'
                      className={`w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0 ${ptMono.className}`}
                    />

                    <div className='flex items-center mt-6'>
                      <div className='w-full h-[1px] bg-gray-300'></div>
                      <p className='px-4'>or</p>
                      <div className='w-full h-[1px] bg-gray-300'></div>
                    </div>

                    <p
                      className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                      Creator name
                    </p>
                    <div className='flex gap-2'>
                      <input
                        type='text'
                        id='default-input'
                        placeholder='name'
                        className={`w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0 ${ptMono.className}`}
                      />
                    </div>

                    <div className='flex gap-5'>
                      <div className=' mt-4'>
                        <label
                          className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                          Instagram Handle
                        </label>
                        <input
                          type='text'
                          id='default-input'
                          placeholder='@milkbar.co'
                          className=' mt-2 w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 outline-0'
                        />
                      </div>
                      <div className=' mt-4'>
                        <label
                          className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                          TikTok Handle
                        </label>
                        <input
                          type='text'
                          id='default-input'
                          placeholder='@matthewvogas'
                          className=' mt-2 w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 outline-0'
                        />
                      </div>
                    </div>

                    {/* <div className='flex gap-5'>
                      <div className=' mt-4'>
                        <label className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                          Facebook Handle
                        </label>
                        <input
                          type='text'
                          id='default-input'
                          placeholder='#example'
                          className=' mt-2 w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                        />
                      </div>
                      <div className=' mt-4'>
                        <label className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                          Pinterest Handle
                        </label>
                        <input
                          type='text'
                          id='default-input'
                          placeholder='#example'
                          className=' mt-2 w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                        />
                      </div>
                    </div> */}

                    <div className='mt-6 text-right'>
                      <button className='rounded-full bg-active px-8 py-2 '>
                        add
                      </button>
                    </div>
                    <hr className='my-8 h-px border-0 bg-gray-200'></hr>

                    <div className='flex mb-12'>
                      <button
                        className={`text-sm mr-6 w-80 rounded-full bg-[#FACEBC] bg-opacity-70 px-8 py-2 ${ptMono.className}`}>
                        upload from file
                      </button>
                      <label
                        className='text-xs text-black opacity-70'
                        htmlFor=''>
                        Download a{' '}
                        <span className='underline'>sample CSV template</span>{' '}
                        to see an example fo the format required.
                      </label>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel className=''>
                  <div className='px-12 mt-8'>
                    <label className='text-xs text-black opacity-50' htmlFor=''>
                      Invite your creators to connect with your campaign below
                      so their stats can be tracked. This gets you a more
                      accurate look at your campaign success and saves both of
                      you hours of collecting stats!{' '}
                      <Link className='underline' href={'/privacy'}>
                        Learn more about privacy and security.
                      </Link>
                    </label>

                    <p
                      className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                      Send an invite via email
                    </p>
                    <div className='flex gap-2'>
                      <EmailsInput emails={emails} setEmails={setEmails} />
                      <button className='rounded-xl bg-active px-8 py-2 '>
                        send
                      </button>
                    </div>

                    <p
                      className={`text-sm font-medium pb-2 pt-6 ${inter.className}`}>
                      Copy link
                    </p>
                    <div className='flex gap-2'>
                      <input
                        value={linkToShareInvite}
                        type='text'
                        id='default-input'
                        className={`w-full rounded-xl border border-gray-300 bg-white p-2.5 px-4 text-sm text-gray-900 focus:outline-0 ${ptMono.className}`}
                      />
                      <button className='rounded-xl bg-active px-8 py-2 '>
                        copy
                      </button>
                    </div>
                    <hr className='my-8 h-px border-0 bg-gray-200'></hr>

                    <div className='flex mb-12'>
                      <label
                        className='text-xs text-black opacity-70'
                        htmlFor=''>
                        Have your own site you want to invite your creators to
                        sign up for this campaign from? Copy this embed code.
                      </label>
                      <button
                        className={`text-sm ml-6 w-80 rounded-full border border-[#FACEBC] bg-opacity-70 px-8 ${ptMono.className}`}>
                        embed a form
                      </button>
                    </div>
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
