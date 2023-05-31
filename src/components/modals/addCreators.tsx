import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'
import avatar from 'public/assets/register/avatar.jpg'
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

export default function AddCreators() {
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
            <h3 className='text-lg font-bold'>Add Creators</h3>
          </div>

          <div className={`w-full justify-start ${ptMono.className}`}>
            <div className='mb-6 mt-6 flex justify-between gap-4  '>
              <button className='w-full rounded-full bg-rose-200 px-8 py-2 '>
                add manually
              </button>
              <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 '>
                invite to connect
              </button>
            </div>
            <label className='' htmlFor=''>
              {comment[0].label}
            </label>

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
              Creator name
            </p>
            <input
              type='text'
              id='default-input'
              placeholder='name'
              className='w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
              Creator name
            </p>
            <div className='flex gap-2'>
              <input
                type='text'
                id='default-input'
                placeholder='name'
                className='w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
              />
              <button className='rounded-xl bg-green-200 px-8 py-2 '>
                send
              </button>
            </div>

            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>Copy link</p>
            <div className='flex gap-2'>
              <input
                type='text'
                id='default-input'
                placeholder='name'
                className='w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
              />
              <button className='rounded-xl bg-green-200 px-8 py-2 '>
                copy
              </button>
            </div>

            <div className='flex gap-5'>
              <div className=' mt-4'>
                <label className={`text-xm pb-2 pt-6 ${inter.className}`}>
                  Instagram Handle
                </label>
                <input
                  type='text'
                  id='default-input'
                  placeholder='#example'
                  className=' mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />
              </div>
              <div className=' mt-4'>
                <label className={`text-xm pb-2 pt-6 ${inter.className}`}>
                  TikTok Handle
                </label>
                <input
                  type='text'
                  id='default-input'
                  placeholder='#example'
                  className=' mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />
              </div>
            </div>

            <div className='flex gap-5'>
              <div className=' mt-4'>
                <label className={`text-xm pb-2 pt-6 ${inter.className}`}>
                  Facebook Handle
                </label>
                <input
                  type='text'
                  id='default-input'
                  placeholder='#example'
                  className=' mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />
              </div>
              <div className=' mt-4'>
                <label className={`text-xm pb-2 pt-6 ${inter.className}`}>
                  Pinterest Handle
                </label>
                <input
                  type='text'
                  id='default-input'
                  placeholder='#example'
                  className=' mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
                />
              </div>
            </div>
            <div className='mt-6 text-right'>
              <button className='rounded-full bg-green-200 px-8 py-2 '>
                add
              </button>
            </div>
            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='flex'>
              <button className='mr-6 w-80 rounded-full bg-green-200 px-8 py-2'>
                upload from file
              </button>
              <label htmlFor=''>
                Download a sample CSV template to see an example fo the format
                required.
              </label>
            </div>
            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='flex'>
              <label htmlFor=''>
                Have your own site you want to invite your creators to sign up
                for this campaign from? Copy this embed code.
              </label>
              <button className='mr-6 w-72 rounded-full bg-green-200 px-8 py-2'>
                embed a form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
