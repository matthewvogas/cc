'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import signup1 from 'public/assets/register/flowSignUp/signup1.jpg'
import signup2 from 'public/assets/register/flowSignUp/signup2.jpg'
import signup3 from 'public/assets/register/flowSignUp/signup3.jpg'
import signup4 from 'public/assets/register/flowSignUp/signup4.jpg'
import signup5 from 'public/assets/register/flowSignUp/signup5.jpg'
import { Pagination } from 'swiper/modules'
import { ptMono } from '@/app/fonts'
import { RegisterNextButton } from './registerNextButton'

import { getServerSession } from 'next-auth'
export const dynamic = 'force-dynamic'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './swiper.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
    session: any
}

export default function Onboarding({session} : Props){

  const user = session?.user.name


  const [slideValue, setSlideValue] = useState(0);
  const slideImages = [signup1, signup2, signup3, signup4, signup5];
  const [slideImage, setSlideImage] = useState(slideImages[slideValue]);

  useEffect(() => {
    if (slideValue >= 0 && slideValue < slideImages.length) {
      setSlideImage(slideImages[slideValue]);
    }
  }, [slideValue, slideImages]);

  function handlePositionSlide() {
    if (slideValue < slideImages.length - 1) {
      setSlideValue(slideValue + 1);
    }
  }

  return (
    <div className='relative flex h-screen w-screen items-center justify-center'>
      <div className='flex w-[500px] flex-col items-center justify-center gap-4  p-10 text-center text-white '>
        <section className='relative h-[600px]'>
          <div className='flex w-[1000px] flex-row items-center justify-center rounded-2xl bg-background bg-opacity-20'>
            <div className='relative h-[579px] w-64'>
              <Image className='rounded-s-2xl object-cover' src={slideImage} fill alt='register-image' />
            </div>
            <Swiper
              pagination={{
                type: 'progressbar',
              }}
              slidesPerView={1}
              modules={[Pagination]}
              allowTouchMove={false}
              className='h-full w-full'>
              <SwiperSlide>
                <div className=' flex flex-col content-start items-start justify-start gap-4 bg-[#F9F8F6] px-10 py-20 text-black'>
                  <h1 className={`${ptMono.className} text-2xl opacity-80`}>
                    welcome {user}!, 🥥
                  </h1>
                  <p className='mb-6 text-sm font-medium'>
                    {`Let’s get your account set up right. What best describes your
              work?`}
                  </p>

                  <div
                    className={` flex w-full flex-col gap-4 ${ptMono.className}`}>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className='flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]'>
                      PR agency
                    </RegisterNextButton>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className='flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]'>
                      influencer marketing agency
                    </RegisterNextButton>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className='flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]'>
                      marketing for a brand or product
                    </RegisterNextButton>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className='flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]'>
                      other
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className='flex flex-col content-start items-start justify-start gap-4 px-20 mt-[96px] h-[483px] text-black'>
                  <p className='mb-4 pt-12 text-sm font-bold'>
                    Tell us a bit about your bussiness
                  </p>
                  <div className='flex w-full flex-col gap-4'>
                    <input
                      type='text'
                      placeholder='company name'
                      className={`w-3/5 rounded-full bg-[#F1EFEA] py-4 pl-6 text-black outline-none ${ptMono.className}`}
                    />
                    <input
                      type='text'
                      placeholder='website'
                      className={`w-3/5 rounded-full bg-[#F1EFEA] py-4 pl-6 text-black outline-none ${ptMono.className}`}
                    />
                  </div>
                  <RegisterNextButton
                    onClickCapture={() => {
                      handlePositionSlide()
                    }}
                    className={` mt-auto mb-8 self-end rounded-full bg-beigeSelected px-8 py-2 ${ptMono.className} `}>
                    next
                  </RegisterNextButton>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className='flex h-[579px] w-full flex-col bg-sidebarBackground px-16 py-20 text-black'>
                  <p className='mb-8 self-start pt-12 text-sm font-bold'>
                    Pick which best describes your company or team
                  </p>

                  <div className={`flex flex-col gap-4 ${ptMono.className}`}>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}>
                      just starting out
                    </RegisterNextButton>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}>
                      full time freelancer
                    </RegisterNextButton>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}>
                      small team (1-5 employees)
                    </RegisterNextButton>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}>
                      larger team (5+)
                    </RegisterNextButton>

                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}>
                      a department of a larger company
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex h-[579px] w-full flex-col bg-sidebarBackground px-16 py-20 text-black'>
                  <p className='mb-8 self-start pt-12 text-left text-sm font-bold'>
                    Do you have a campaign that you want to get started <br />{' '}
                    in Codecoco now?
                  </p>

                  <div className='flex flex-col gap-4'>
                    <Link
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}
                      href={'/dashboard'}>
                      yes, let’s get started.
                    </Link>
                    <RegisterNextButton
                      onClickCapture={() => {
                        handlePositionSlide()
                      }}
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}>
                      no, just wanted to look around.
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`flex h-[579px] w-full flex-col bg-sidebarBackground px-16 py-20 text-black ${ptMono.className}`} >
                  <p className='mb-8 self-start pt-12 text-left text-sm font-bold'>
                    Yep, that’s fine! Select an feature to start with:
                  </p>
                  <div className='flex flex-col gap-4'>
                    <Link
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}
                      href={'/dashboard'}>
                      tracking social post stats
                    </Link>
                    <Link
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}
                      href={'/dashboard'}>
                      create a mock campaign
                    </Link>
                    <Link
                      className={`flex w-3/5 justify-start rounded-full  bg-[#F1EFEA] p-4 pl-6 lowercase text-black hover:bg-[#FACEBC]`}
                      href={'/dashboard'}>
                      take a mini guided tour
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <div className='my-7 h-px w-full rounded-r-full bg-white opacity-50'></div>
      </div>
    </div>
  )
}
