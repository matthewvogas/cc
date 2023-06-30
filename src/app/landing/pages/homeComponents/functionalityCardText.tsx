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
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight

      props.cards.forEach((_, i) => {
        const cardElement = document.querySelector(`#card-${i}`) as HTMLElement
        if (cardElement) {
          const cardRect = cardElement.getBoundingClientRect()
          const distanceFromBottom = windowHeight - cardRect.bottom
          const opacity = Math.max(0, 1 - distanceFromBottom / windowHeight)

          const threshold = 100
          if (distanceFromBottom < threshold) {
            cardElement.style.opacity = opacity.toString()
          } else {
            cardElement.style.opacity = '0'
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [props.cards])

  return (
    <div className='flex h-full flex-col gap-5'>
      {props.cards.map(({ title, text }: Card, i: number) => (
        <div
          key={i}
          id={`card-${i}`}
          className='sticky top-[3em] h-full bg-secondBackground'
          style={{
            transition: 'opacity 0.5s',
            transform: `translateY(${i}em)`,
          }}>
          <div className='text-4xl font-bold text-black'>
            <h3 className='mb-4'>{title}</h3>
            <p className={`${ptMono.className} mb-10 text-base`}>{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardsTextE
