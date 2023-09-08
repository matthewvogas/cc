import registerImage from 'public/assets/shareStats/statsBackground.jpg'
import { inter, ptMono } from '@/app/fonts'
import React, { useRef } from 'react'
import Image from 'next/image'

type Props = {
  userPositionId: number
  stats: any
}

export default function ShareStat({ userPositionId, stats }: Props) {
  const [codeToCopy, setcodeToCopy] = React.useState('')

  const html =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Stats</title> </head> <body>' +
    '<iframe src="http://dev.codecoco.co/stats/' +
    userPositionId +
    '"' +
    ' height="310" width="850"></iframe>' +
    '</body> </html>'
  const iframe =
    '<iframe src="http://dev.codecoco.co/stats/' +
    userPositionId +
    ' height="310" width="850"></iframe>'

  const statsGrid = stats
    ?.find((section: any) => section.section === 'public')
    ?.data.map((stat: any, index: number) => (
      <div key={index}>
        <h4 className='text-3xl'>{stat.title}</h4>
        <span>{stat.description}</span>
      </div>
    ))

  const copiarTexto = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const copiadoModal = document.getElementById('copiadoModal')
      copiadoModal?.classList.remove('hidden')
      setTimeout(() => {
        copiadoModal?.classList.add('hidden')
      }, 1000)
    } catch (err) {
      console.error('Could not copy text: ', err)
    }
  }

  return (
    <div>
      <label
        htmlFor='my-modal-3'
        className='bg-[#E9F7F0]  flex bg-text-lg align-center items-center border-rose-100 py-2.5 px-9 text-back font-medium h-full rounded-full cursor-pointer'>
        share live stats
      </label>
      <input type='checkbox' id='my-modal-3' className='  modal-toggle' />
      <div className='modal '>
        <div className='modal-box relative flex max-w-max flex-col justify-start overflow-hidden rounded-xl bg-white  p-0'>
          <Image
            src={registerImage}
            className='h-[300px] w-full object-cover'
            alt='register-image'
          />
          <div className='absolute w-full top-16 text-white flex justify-evenly px-14 py-20'>
            {statsGrid}
          </div>

          <label
            htmlFor='my-modal-3'
            className='absolute right-4 top-2 cursor-pointer text-lg text-white'>
            ✕
          </label>

          <div className='px-10 py-8'>
            <h3 className='text-xl font-bold'>
              Embed your total live stats on to a webpage
            </h3>

            <div className={`w-full justify-start `}>
              <p className={` pb-6 text-xs text-[#7F7F7F] mt-2`}>
                Copy and paste a code below. You can manage styles via CSS.
              </p>

              <div className='flex gap-6'>
                <div className=' flex w-56 text-sm flex-col gap-3'>
                  <button
                    onClick={() => setcodeToCopy(html)}
                    className='w-full rounded-full border border-[#FACEBC] px-8 py-2 hover:bg-[#FACEBC]'>
                    HTML + CSS
                  </button>
                  <button
                    onClick={() => setcodeToCopy(iframe)}
                    className='w-full rounded-full border border-[#FACEBC] px-8 py-2 hover:bg-[#FACEBC]'>
                    iframe
                  </button>
                </div>

                <div
                  className={`w-full rounded-xl border border-[#7F7F7F] p-6 ${ptMono.className}`}>
                  <textarea
                    value={codeToCopy}
                    readOnly
                    placeholder='https://'
                    className='h-[124px] min-w-full resize-none text-gray-600 outline-none'
                  />
                  <div
                    id='copiadoModal'
                    className={` ${inter.className} fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 px-4 py-2 border border-[#b6fcdb] bg-[#e9faf2] bg-opacity-90 text-sm rounded-md z-50 hidden`}>
                    link copied successfully!
                  </div>
                </div>
              </div>

              <hr className=' h-px bg-gray-200 my-8'></hr>

              <div className='text-right'>
                <button
                  onClick={() => {
                    copiarTexto(codeToCopy)
                  }}
                  className={`${ptMono.className} rounded-lg bg-[#D3F0E2] px-8 py-2`}>
                  {'copy </>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
