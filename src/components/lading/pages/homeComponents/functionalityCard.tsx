import Image from 'next/image'
import { ptMono } from '@/app/fonts'

import React from 'react'

export default function Cards(props: { cards: any }) {
  return (
    <div className=' flex flex-col gap-20'>
      {props.cards.map(({ size, imageCard }: any, i: any) => (
        <div key={i} className='flex h-full justify-center'>
          <div className='flex flex-col self-center'>
            <Image src={imageCard} className='w-full' alt={''} />
          </div>
        </div>
      ))}
    </div>
  )
}
