'use client'
import React, { useEffect } from 'react'
import { ptMono } from '@/app/fonts'

interface Card {
  title: string
  text: string
}

interface CardsTextEProps {
  cards: Card[]
}

const CardsTextE: React.FC<CardsTextEProps> = (props: CardsTextEProps) => {
  return (
    <div className='flex h-full flex-col gap-20'>
      {props.cards.map(({ title, text }: Card, i: number) => (
        <div
          key={i}
          id={`card-${i}`}
          className=' flex h-full bg-secondBackground'>
          <div className='flex flex-col self-center text-[28px] font-bold text-black'>
            <h3 className='mb-4'>{title}</h3>
            <p className={`${ptMono.className} mb-10 pr-28 text-base`}>
              {text}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardsTextE
