'use client'
import { Dialog } from '@headlessui/react'
import { ptMono } from '@/app/fonts'
import { useState } from 'react'

// Fonts

// Style Variables
const dropdownButton =
  'text-lg  border-2 inline-block py-2 px-8 m-2 text-back font-medium bg-whiteBrown rounded-full hover:border-orange-100'
const ActionButtonStyle =
  'flex bg-text-lg align-center items-center border-rose-100 inline-block py-2.5 px-8 mx-2 text-back font-medium h-12 bg-roseButtons rounded-full h- cursor-pointer'

export default function AddNewCampaign(props: { createCampaign: any }) {
  return (
    <>
      <div className='dropdown-end dropdown cursor-pointer '>
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
          className='dropdown-content menu rounded-box mr-4 mt-2 w-auto border-2  border-gray-100 bg-white p-2'>
          <button
            className={`${dropdownButton}`}
            onClick={() => props.createCampaign(true)}>
            manual
          </button>
        </ul>
      </div>
    </>
  )
}
