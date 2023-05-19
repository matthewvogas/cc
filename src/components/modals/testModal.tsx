'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function MyDialog() {
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
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        {/* The actual dialog panel  */}
        <Dialog.Panel className='mx-auto max-w-sm flex flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
          <Dialog.Title className='text-lg font-bold'>{title[1].label}</Dialog.Title>
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
              type='text'
              id='default-input'
              placeholder='Campaign Name'
              className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />

            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='text-center'>
              <button className='rounded-full bg-rose-200 px-6 py-2 '>
                create project
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
