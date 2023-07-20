'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import OneCard from 'public/assets/SandBox/steps/CreateCampaign.png'
import SecondCard from 'public/assets/SandBox/steps/addPosts.png'
import ThreeCard from 'public/assets/SandBox/steps/Filter.png'
import FourCard from 'public/assets/SandBox/steps/Share.png'
import React from 'react'

const sliderCard = [
  {
    title: '1. Create a campaign',
    description:
      'Create a campaign. Organize your campaigns by client or by tags.',
    image: OneCard,
  },
  {
    title: '2. Add posts to track',
    description: 'Paste links from social media or upload in bulk via file.',
    image: SecondCard,
  },
  {
    title: '3. View and Filter',
    description: 'Consult all your information easily and quickly',
    image: ThreeCard,
  },
  {
    title: '4. Share',
    description:
      'Share the real campaigns or campaign’s posts with other people',
    image: FourCard,
  },
]

export default function SliderCard() {
  const cardContainerRef = useRef<HTMLDivElement>(null)

  const buttons = [
    { number: 1, label: 'create a campaign' },
    { number: 2, label: 'add posts' },
    { number: 3, label: 'view + filter results' },
    { number: 4, label: 'share' },
  ]

  const cocos = [
    { number: 1, label: '🥥' },
    { number: 2, label: '🥥' },
    { number: 3, label: '🥥' },
    { number: 4, label: '🥥' },
  ]

  const [activeButton, setActiveButton] = React.useState(1)
  const [activeCard, setActiveCard] = React.useState(0)

  useEffect(() => {
    const container = cardContainerRef.current
    if (container) {
      const cardWidth = container.scrollWidth / sliderCard.length
      const scrollLeft =
        activeCard * cardWidth + cardWidth / 2 - container.offsetWidth / 2
      container.scroll({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeCard])

  const handleButtonClick = (index: number) => {
    setActiveButton(index)
    setActiveCard(index - 1)
  }

  return (
    <div>
      <div
        className='flex overflow-x-auto'
        style={{ paddingLeft: 'calc(50vw - 595px)' }}>
        <div className='mb-9 gap-4 hidden lg:flex'>
          {buttons.map((button, index) => (
            <button
              key={button.number}
              className={`rounded-full px-8 py-3 ${
                activeButton === button.number ? 'bg-green-100' : ''
              }`}
              onClick={() => handleButtonClick(button.number)}>
              {button.number}. {button.label}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={cardContainerRef}
        className=' pr-4 lg:pr-[50vw] ml-4 lg:ml-0 mb-12 lg:mb-24 flex gap-4 overflow-x-auto'
        style={{
          paddingLeft: 'calc(50vw - 595px)',
        }}>
        {sliderCard.map((card, index) => (
          <div
            key={index}
            className={`flex w-[525px] min-w-max flex-col items-center justify-between rounded-xl  border border-gray-200 pt-11 ${
              activeCard === index ? 'bg-[#F8F5F1]' : ''
            }`}>
            <div className='flex flex-col items-center justify-center'>
              <h5 className='mb-5 w-full text-center text-base lg:text-[24px] font-semibold'>
                {card.title}
              </h5>
              <p
                className={`text-xs mb-8 w-[300px] lg:w-[355px] text-center lg:text-base ${ptMono.className}`}>
                {card.description}.
              </p>
            </div>
            <Image
              src={card.image}
              className='rounded-b-xl hidden lg:block'
              alt=''
              style={{ width: 'inherit' }}
            />

            <Image
              src={card.image}
              className='rounded-b-xl lg:hidden'
              alt=''
              style={{ width: '350px' }}
            />
          </div>
        ))}
      </div>

      <div className='mb-9 gap-4 flex  lg:hidden px-12 justify-center'>
        {cocos.map((coco, index) => (
          <button
            key={coco.number}
            className={`rounded-full px-2 ${
              activeButton === coco.number ? '' : 'opacity-50'
            }`}
            onClick={() => handleButtonClick(coco.number)}>
            {coco.label}
          </button>
        ))}
      </div>
    </div>
  )
}
