import { Inter } from 'next/font/google'
import { PT_Mono } from 'next/font/google'
import React from 'react'

// Fonts
const inter = Inter({ weight: '400', subsets: ['latin'] })
const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

const stat = [
  {
    label: 'creators',
    qty: 755,
  },
  {
    label: 'campaigns',
    qty: 55,
  },
  {
    label: 'views',
    qty: 50.567,
  },
  {
    label: 'plays',
    qty: '1,555.765',
  },
]

// Show Arrays
const stats = stat.map((stat, index) => (
  <div>
    <h4 className='text-3xl'>{stat.qty}</h4>
    <span>{stat.label}</span>
  </div>
))

export default function ShareStat() {
  return (
    <div>
      <label htmlFor='my-modal-3'>MODAL</label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex max-w-max flex-col justify-start overflow-hidden rounded-xl bg-white  p-0'>
          <div className='flex justify-between bg-green-100 px-14 py-20'>
            {stats}
          </div>

          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg'>
            ✕
          </label>

          <div className='px-10 py-8'>
            <h3 className='pb-4 text-2xl font-bold'>
              Embed your total live stats on to a webpage
            </h3>

            <div className={`w-full justify-start ${ptMono.className}`}>
              <p className='pb-6'>
                Copy and paste a code below. You can manage styles via CSS.
              </p>

              <div className='flex gap-6'>
                <div className=' flex w-52 flex-col gap-3'>
                  <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 hover:bg-rose-200 '>
                    iframe
                  </button>
                  <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 hover:bg-rose-200 '>
                    javascript
                  </button>
                  <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 hover:bg-rose-200 '>
                    HTML + CSS
                  </button>
                </div>

                <div className='w-full rounded-xl border-2 border-gray-400 p-6'>
                  <textarea className='min-h-full min-w-full resize-none text-gray-600 outline-none'>
                    https://
                  </textarea>
                </div>
              </div>

              <hr className='my-8 h-px border-0 bg-gray-200'></hr>
              <div className='text-right'>
                <button className='rounded-full bg-green-200 px-8 py-2 '>
                  copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
