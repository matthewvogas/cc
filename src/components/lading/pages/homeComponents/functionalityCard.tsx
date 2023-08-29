import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import check from 'public/assets/SandBox/Cards/check.svg'
import React from 'react'

export default function Cards(props: {
  card: any
  flex: string
  justify: string
}) {
  return (
    <>
      <div
        className={` flex flex-col-reverse ${props.flex} pb-12  gap-6 items-center ${props.card.bg}  `}>
        <div className=' flex w-full flex-col '>
          <div className={`flex h-full ${props.justify}`}>
            <div className='hidden lg:flex flex-col self-center'>
              <Image
                src={props.card.imageCard}
                className={`w-[${props.card.size}]`}
                alt={''}
              />
            </div>
            <div className='flex lg:hidden flex-col self-center'>
              <Image
                src={props.card.imageCardMobile}
                className={`w-[${props.card.size}]`}
                alt={''}
              />
            </div>
          </div>
        </div>

        <div
          className={`flex h-full w-[100%] items-center ${props.card.bg} lg:bg-secondBackground`}>
          <div
            className={`flex flex-col self-center text-[28px] font-bold text-black px-12 lg:px-0 ${props.card.bg}`}>
            <div className='mb-5 pt-14 lg:pt-0 flex content-center items-center'>
              <span className='text-sm lg:text-base mr-2'>🥥</span>
              <span
                className={`text-sm lg:text-base font-light  ${ptMono.className}`}>
                {props.card.subTitle}
              </span>
            </div>
            <h3
              className={`text-[28px] lg:text-[28px] leading-[32px] mb-4 w-full lg:w-[81%] font-semibold`}>
              {props.card.title}
            </h3>
            <div className={` mb-10  text-base`}>
              {Object.values(props.card.features).map((feature: any, index) => (
                <div className='flex gap-3' key={index}>
                  <Image src={check} alt={''} />{' '}
                  <p className='mb-2 text-base font-normal' key={index}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
