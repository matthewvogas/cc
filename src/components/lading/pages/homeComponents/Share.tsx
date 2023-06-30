'use client'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import cocoImage from 'public/assets/register/cocoIcon.svg'
import ipadMockup from 'public/assets/register/ipadMockup.svg'
import React from 'react'

export default function Share() {
  const codigo = ` <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Campaign</title>
  </head>
  <body>
    <iframe src="http://dev.codecoco.co/campaign/" height=
  </body>
  </html>`

  const frame = `<iframe src="http://dev.codecoco.co/campaign/" height=`

  const link = `http://dev.codecoco.co/campaign/`

  const codigoConSaltosDeLinea = codigo.replace(/\n/g, '\n')
  const [type, setType] = React.useState(codigo)

  return (
    <>
      <div className='absolute z-30 flex w-[500px] flex-col gap-2 rounded-2xl border-2 border-borderCards bg-target px-10 py-8 leading-5 shadow-[1px_2px_10px_1px_#e6e6e6] '>
        <Image
          src={cocoImage}
          className='absolute -ml-[55px] -mt-[50px] w-9'
          alt={''}
        />
        <div className='flex items-center gap-2 '>
          <h4 className='text-2xl font-bold'>Share your results</h4>{' '}
          <h4 className='text-2xl font-light italic '>(or not)</h4>
        </div>
        <p className={`${ptMono.className}`}>
          Share your live campaign grid with a private or public link or embed
          on your own webpage.{' '}
        </p>
      </div>

      <div className=' absolute z-10 ml-32 mt-[156px] rounded-2xl border-2 border-borderCards p-5 shadow-[1px_2px_10px_1px_#e6e6e6]'>
        <div className='mb-4 flex gap-4 rounded-2xl bg-white text-base'>
          <button
            onClick={() => setType(codigo)}
            className='rounded-full border-2 border-borderCards bg-target px-5 py-2 hover:bg-opacity-0'>
            HTML & CSS
          </button>
          <button
            onClick={() => setType(frame)}
            className='rounded-full border-2 border-borderCards bg-target px-5 py-2 hover:bg-opacity-0'>
            Frame
          </button>
          <button
            onClick={() => setType(link)}
            className='rounded-full border-2 border-borderCards bg-target px-5 py-2 hover:bg-opacity-0'>
            Link
          </button>
        </div>

        <div className='h-[280px] w-[600px] rounded-xl border-2 bg-[#99A09D] p-5'>
          <pre className='text-white'>
            <div className='flex items-end justify-between'>{type}</div>
          </pre>
        </div>
      </div>
      <Image src={ipadMockup} className='absolute z-20 ml-[33rem]' alt={''} />
    </>
  )
}
