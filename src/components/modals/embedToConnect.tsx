import { ptMono } from '@/app/fonts'
import React from 'react'


export default function EmbedToConnect() {
  return (
    <div>
      <label htmlFor='my-modal-3' className=''>
        MODAL
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex max-w-max flex-col justify-start overflow-hidden rounded-xl bg-white px-20 py-12'>
          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg'>
            ✕
          </label>
          <h3 className='pb-4 text-2xl font-bold'>
            Get an embed form to invite creators to connect
          </h3>

          <div className={`w-full justify-start ${ptMono.className}`}>
            <p className='pb-6'>
              Copy and paste a code or form option below to allow creators to
              connect to your campaign from your own site or email. Learn more
              about privacy and security.
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
                  Hyperlink
                </button>
                <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 hover:bg-rose-200 '>
                  QR code
                </button>
                <button className='w-full rounded-full border-2 border-rose-200 px-8 py-2 hover:bg-rose-200 '>
                  HTML + CSS
                </button>
              </div>

              <div className='w-full rounded-xl border-2 border-gray-400 p-6'>
                <textarea className='min-h-full min-w-full resize-none text-gray-600 outline-none' />
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
  )
}
