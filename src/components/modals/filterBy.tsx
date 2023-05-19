import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'
import React from 'react'

// Fonts
const inter = Inter({ weight: '400', subsets: ['latin'] })
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

// Arrays
const title = [
  {
    label: 'Filter view by creator',
  },
  {
    label: 'filter view by hashatg',
  },
]

// Show Arrays
export default function FilterBy() {
  return (
    <div>
      <label htmlFor='my-modal-3' className=''>
        MODAL
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex flex-col items-center justify-center rounded-xl bg-white px-20 py-12'>
          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>{title[1].label}</h3>

          <div className={`w-full justify-start ${ptMono.className}`}>
            <input
              type='text'
              id='default-input'
              placeholder='Search'
              className='w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:outline-0'
            />
            <p className={`text-xm pb-2 pt-6 ${inter.className}`}>
              Select creators below to view only their posts
            </p>

            <hr className='my-8 h-px border-0 bg-gray-200'></hr>

            <div className='text-right'>
              <button className='rounded-full bg-green-100 px-6 py-2 '>
                filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
