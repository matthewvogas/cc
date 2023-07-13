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
      <div className={`flex ${props.flex} mb-32 gap-6`}>
        <div className=' flex w-full flex-col gap-20'>
          <div className={`flex h-full ${props.justify}`}>
            <div className='flex flex-col self-center'>
              <Image
                src={props.card.imageCard}
                className={`w-[${props.card.size}]`}
                alt={''}
              />
            </div>
          </div>
        </div>

        <div className=' flex h-full w-[60%] items-center bg-secondBackground'>
          <div className='flex flex-col self-center text-[28px] font-bold text-black'>
            <div className='mb-5 flex content-center items-center'>
              <span className='mr-2'>🥥</span>
              <span className={`text-base font-light ${ptMono.className}`}>
                {props.card.subTitle}
              </span>
            </div>
            <h3 className='mb-4'>{props.card.title}</h3>
            <div className={` mb-10 pr-28 text-base`}>
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
