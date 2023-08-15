'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import registerImage from 'public/assets/register/registerFlow.png'
import { Sen } from 'next/font/google'
import logo from 'public/assets/register/LogoSVG.svg'
import registerBg from 'public/assets/register/login.jpg'
import { Pagination } from 'swiper/modules'
import { ptMono } from '@/app/fonts'
import { RegisterNextButton } from './registerNextButton'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './swiper.css'

export default function RegisterPage() {
  return (
    <div className='relative flex h-screen w-screen items-center justify-center'>
      <div className='flex w-[500px] flex-col items-center justify-center gap-4  p-10 text-center text-white '>
        <section className='relative h-[600px]'>
          <div className='flex w-[1000px] flex-row items-center justify-center rounded-2xl bg-background bg-opacity-20'>
            <div className='relative h-[579px] w-64'>
              <Image src={registerImage} fill alt='register-image' />
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
                <div className=' flex flex-col content-start items-start justify-start gap-4 bg-sidebarBackground px-10 py-20 text-black'>
                  <h1 className={`${ptMono.className} text-2xl opacity-80`}>
                    welcome Sophia!, 🥥
                  </h1>
                  <p className='mb-6 text-sm font-medium'>
                    {`Let’s get your account set up right. What best describes your
              work?`}
                  </p>

                  <div
                    className={` flex w-full flex-col gap-4 ${ptMono.className}`}>
                    <RegisterNextButton className='flex w-3/5 justify-start rounded-full  bg-anotherColor p-4 pl-6 lowercase text-black'>
                      PR agency
                    </RegisterNextButton>
                    <RegisterNextButton className='flex w-3/5 justify-start rounded-full  bg-anotherColor p-4 pl-6 lowercase text-black'>
                      influencer marketing agency
                    </RegisterNextButton>
                    <RegisterNextButton className='flex w-3/5 justify-start rounded-full  bg-anotherColor p-4 pl-6 lowercase text-black'>
                      marketing for a brand or product
                    </RegisterNextButton>
                    <RegisterNextButton className='flex w-3/5 justify-start rounded-full  bg-anotherColor p-4 pl-6 lowercase text-black'>
                      other
                    </RegisterNextButton>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className='flex w-full flex-col content-start items-start justify-start gap-4 bg-sidebarBackground px-16 py-20 text-black'>
                  <p className='mb-4 pt-12 text-sm font-bold'>
                    Tell us a bit about your bussiness
                  </p>
                  <div className='flex w-full flex-col gap-4'>
                    <input
                      type='text'
                      placeholder='company name'
                      className={`w-3/5 rounded-full bg-beigeSelected py-4 pl-6 text-black outline-none ${ptMono.className}`}
                    />
                    <input
                      type='text'
                      placeholder='website'
                      className={`w-3/5 rounded-full bg-beigeSelected py-4 pl-6 text-black outline-none ${ptMono.className}`}
                    />
                  </div>
                  <RegisterNextButton
                    className={` mt-auto self-end rounded-full bg-beigeSelected px-8 py-2 ${ptMono.className} `}>
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
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      just starting out
                    </RegisterNextButton>
                    <RegisterNextButton
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      full time freelancer
                    </RegisterNextButton>
                    <RegisterNextButton
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      small team (1-5 employees)
                    </RegisterNextButton>
                    <RegisterNextButton
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      larger team (5+)
                    </RegisterNextButton>

                    <RegisterNextButton
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      a department of a larger company
                    </RegisterNextButton>
                  </div>

                  <RegisterNextButton />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='flex h-[579px] w-full flex-col bg-sidebarBackground px-16 py-20 text-black'>
                  <p className='mb-8 self-start pt-12 text-left text-sm font-bold'>
                    Do you have a campaign that you want to get started <br />{' '}
                    in Codecoco now?
                  </p>

                  <div className='flex flex-col gap-4'>
                    <RegisterNextButton
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      yes, let’s get started.
                    </RegisterNextButton>
                    <RegisterNextButton
                      className={`flex w-3/5 justify-start rounded-full  bg-beigeSelected p-4 pl-6 lowercase text-black`}>
                      no, just wanted to look around.
                    </RegisterNextButton>
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
