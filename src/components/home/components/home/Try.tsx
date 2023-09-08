'use client'

import OneCard from 'public/assets/SandBox/Cards/performingPost.png'
import OneTwo from 'public/assets/SandBox/Cards/UsePost.png'
import check from 'public/assets/SandBox/Cards/check.svg'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'

export default function Try() {
  return (
    <>
      <div className='m-auto flex px-4 lg:px-0 lg:w-[1280px] flex-col items-center justify-center py-16 overflow-hidden lg:overflow-visible'>
        <h2 className='text-base lg:text-2xl font-bold text-black mb-8 lg:mb-20'>
          but wait, there’s more! 🥥
        </h2>

        <div>
          <div
            className={` flex flex-col lg:flex-row pb-12  gap-6 items-center bg-white  `}>
            <div className=' flex w-full flex-col '>
              <div className={`flex h-full`}>
                <div className=' lg:flex flex-col self-center'>
                  <Image src={OneCard} className={`w-[700px]`} alt={''} />
                </div>
              </div>
            </div>
            <div className={`flex h-full w-[100%] items-center `}>
              <div
                className={`flex flex-col self-center text-[28px] font-bold text-black px-12 lg:px-0`}>
                <div className='mb-5 pt-4 lg:pt-0 flex content-center items-center'>
                  <span className='text-sm lg:text-base mr-2'>🥥</span>
                  <span
                    className={`text-sm lg:text-base font-light  ${ptMono.className}`}>
                    know what content works
                  </span>
                </div>
                <h3
                  className={`text-[28px] lg:text-[28px] leading-[32px] mb-4 w-full lg:w-[81%] font-semibold`}>
                  Codecoco identifies top performing posts with a click
                </h3>
                <div className={` mb-10  text-base`}>
                  <div className='flex gap-3'>
                    <Image src={check} alt={''} />{' '}
                    <p className='mb-2 text-base font-normal'>
                      Identify your ideal content style + creators
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <Image src={check} alt={''} />{' '}
                    <p className='mb-2 text-base font-normal'>
                      Identify your ideal content style + creators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* card two */}

          <div
            className={` flex flex-col lg:flex-row pb-12  gap-6 bg-white items-end lg:-mt-52 `}>
            <div className=' flex lg:hidden w-full flex-col '>
              <div className={`flex h-full`}>
                <div className=' flex-col self-center'>
                  <Image src={OneTwo} className={`w-[700px]`} alt={''} />
                </div>
              </div>
            </div>
            <div className={`flex h-full w-[100%] items-center `}>
              <div
                className={`flex flex-col self-center text-[28px] font-bold text-black px-12 lg:px-0`}>
                <div className='mb-5 pt-14 lg:pt-0 flex content-center items-center'>
                  <span className='text-sm lg:text-base mr-2'>🥥</span>
                  <span
                    className={`text-sm lg:text-base font-light  ${ptMono.className}`}>
                    put good content to work
                  </span>
                </div>
                <h3
                  className={`text-[28px] lg:text-[28px] leading-[32px] mb-4 w-full lg:w-[81%] font-semibold`}>
                  Allow clients to download top performing images & videso
                </h3>
                <div className={` mb-10  text-base`}>
                  <div className='flex gap-3'>
                    <Image src={check} alt={''} />{' '}
                    <p className='mb-2 text-base font-normal'>
                      Forget gathering up images
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <Image src={check} alt={''} />{' '}
                    <p className='mb-2 text-base font-normal'>
                      Clients can download, share, and embed content
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=' hidden lg:flex w-full flex-col '>
              <div className={`flex h-full`}>
                <div className=' lg:flex flex-col self-center'>
                  <Image src={OneTwo} className={`w-[700px]`} alt={''} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
