import Image from 'next/image'
import { ptMono } from '@/app/fonts'

import React from 'react'

export default function Cards(props: { cards: any }) {
  return (
    <div className=' flex flex-col gap-3'>
      {props.cards.map(({ title, text, imageCard }: any, i: any) => (
        <div
          key={i}
          className='sticky top-[3em] rounded-2xl border-borderCards bg-white shadow-[1px_2px_10px_0px_#F9EEE0]'
          style={{ transform: `translateY(${i}em)` }}>
          <div className=''>
            <div className='px-8 pt-8'>
              <h4 className='mb-4 text-3xl font-bold'>{title}</h4>
              <p className={`${ptMono.className} mb-10 pr-7 text-base`}>
                {text}
              </p>
            </div>
            <Image src={imageCard} className='w-full' alt={''} />
          </div>
        </div>
      ))}
    </div>
  )
}
