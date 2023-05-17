'use client'
import { PT_Mono } from 'next/font/google'

// Fonts
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

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

// Show Arrays
const buttons = button.map((btn, index) => (
  <button key={index} className={`${dropdownButton}`}>
    {btn.label}
  </button>
))

export default function AddNewCampaign() {
  return (
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
  )
}
