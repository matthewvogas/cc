import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'
import React from 'react'

// Fonts
const inter = Inter({ weight: '400', subsets: ['latin'] })
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Arrays
const social = [
  {
    name: "Instagram",
  },
  {
    name: "TikTok",
  },
  {
    name: "Pinterest",
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

const socialNetworks = social.map((social, index) => (
  <option value={index} id='companies-menu' key={index}>
    {social.name}
  </option>
))

export default function AddNewPots() {
  return (
    <div>
      <label htmlFor='my-modal-3' className=''>
        MODAL
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex max-w-max flex-col items-center justify-center rounded-xl bg-white px-20 py-12 overflow-hidden'>
          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>Add Posts</h3>

          <div className={`w-full justify-start ${ptMono.className}`}>
            <div className='mt-6 flex gap-4 justify-between'>
              <button className='rounded-full bg-rose-200 px-8 py-2 w-full '>
                add from link
              </button>
              <button className='rounded-full border-2 border-rose-200 px-8 py-2 w-full '>
                upload from file
              </button>
            </div>
            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
              Asign To creator
            </p>
            <select
              id='countries'
              className='inline-block w-full rounded-full border border-gray-300 p-2.5 px-4 text-sm text-gray-900 focus:outline-0 bg-green-50'>
              <option value={0} disabled>
                Choose a client
              </option>
              {clients}
            </select>

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
              Instagram, Facebook, or TikTok link
            </p>
            <input
              type='text'
              id='default-input'
              placeholder='https://'
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
              Hashtag
            </p>
            <input
              type='text'
              id='default-input'
              placeholder='#example'
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
                Select platform to track on
            </p>
            <select
              id='countries'
              className='inline-block w-full rounded-full border border-gray-300 p-2.5 px-4 text-sm text-gray-900 focus:outline-0 bg-green-50'>
              <option value={0} disabled>
                Choose a client
              </option>
              {socialNetworks}
            </select>


            <label className='mt-2 flex text-xs text-gray-500' htmlFor=''>
              bulk add links
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 36 36'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mr-4 h-6 w-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                />
              </svg>
            </label>

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
                Download a sample CSV template to see an example fo the format required.
            </p>

            <div className='border-2 border-gray-300 rounded-xl '>
              <input type="file" className="file-input h-40 file-input-ghost w-full" />
            </div>
            
            <hr className='my-8 h-px border-0 bg-gray-200'></hr>
            <div className='text-right'>
              <button className='rounded-full bg-green-200 px-8 py-2 '>
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
