'use client'

import { ptMono } from '@/app/fonts'

export default function Tags() {
  return (
    <div>
      <p className={`${ptMono.className} mb-2 text-sm`}>tags</p>
      <div className='${ptMono.className} flex cursor-pointer content-center items-center justify-center gap-5 rounded-full border-2 border-gray-200 px-6 py-2 text-gray-500  focus:outline-none'>
        <input placeholder='Name' className={`focus:outline-none`} />
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
      </div>
    </div>
  )
}
