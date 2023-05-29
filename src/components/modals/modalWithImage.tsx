import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'
import React from 'react'

// Fonts
const inter = Inter({ weight: '400', subsets: ['latin'] })
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Arrays
const comment = [
  {
    label:
      'Manually adding creators is to assign posts to their profile and organize them within campaigns. To collect additional stats, invite creators to connect instead. ',
  },
  {
    label:
      'Invite your creators to connect with your campaign below so their stats can be tracked. This gets you a more accurate look at your campaign success and saves both of you hours of collecting stats! Learn more about privacy and security. ',
  },
]
const social = [
  {
    name: 'Instagram',
  },
  {
    name: 'TikTok',
  },
  {
    name: 'Pinterest',
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

export default function ModalWithImage() {
  return (
    <div>
      <label htmlFor='my-modal-3' className=''>
        MODAL
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex max-w-5xl flex-col items-center justify-center  rounded-xl bg-white px-20 py-12'>
          <div>
            <label
              htmlFor='my-modal-3'
              className='absolute right-4 top-2 cursor-pointer text-lg'>
              ✕
            </label>

            <label htmlFor=''>your creators have been added.</label>
          </div>

          <label className='' htmlFor=''>
            {comment[0].label}
          </label>

          <div className={`w-full justify-start ${ptMono.className}`}>
            <div className='mb-6 mt-6 flex justify-between gap-4  '>
              <button className='w-full rounded-full bg-rose-200 px-8 py-2 '>
                add manually
              </button>
              <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 '>
                invite to connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
