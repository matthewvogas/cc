'use client'
import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

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
  return (
    <div className='flex w-full justify-between md:px-12'>
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
          className={`flex rounded-full bg-green-100 px-6 py-3 text-black ${ptMono.className}`}>
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
  )
}
