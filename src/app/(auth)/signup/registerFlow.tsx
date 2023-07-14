'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import registerImage from 'public/assets/register/registerFlow.png'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import { ptMono } from '@/app/fonts'
import { RegisterNextButton } from './registerNextButton'

export const RegisterFlow = () => {
  return (
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
          className='w-full'>
          <SwiperSlide>
            <div className='flex h-[579px] flex-col gap-4 px-10 py-20'>
              <h1 className={`${ptMono.className} text-2xl opacity-80`}>
                welcome Sophia!, 🥥
              </h1>
              <p className='text-lg font-bold'>
                {`Let’s get your account set up right. What best describes your
              work?`}
              </p>

              <div className='flex flex-col gap-4 pl-2 pt-5'>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  PR agency
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  influencer marketing agency
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  marketing for a brand or product
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  other
                </RegisterNextButton>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='flex h-[579px] flex-col gap-4 px-10 py-20'>
              <p className='pt-12 text-lg font-bold'>
                {`Tell us a bit about your bussiness`}
              </p>

              <div className='flex flex-col gap-4 pl-2 pt-5'>
                <input
                  type='text'
                  placeholder='company name'
                  className='input w-full max-w-xs'
                />
                <input
                  type='text'
                  placeholder='website'
                  className='input w-full max-w-xs'
                />
              </div>
              <RegisterNextButton className='btn-primary btn mt-auto self-end'>
                Next
              </RegisterNextButton>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='flex h-[579px] flex-col px-10 py-20'>
              <p className='pt-12 text-lg font-bold'>
                {`Pick which best describes your company or team`}
              </p>

              <div className='flex flex-col gap-4 pl-2 pt-5'>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  just starting out
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  full time freelancer
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  small team (1-5 employees)
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  larger team (5+)
                </RegisterNextButton>

                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  a department of a larger company
                </RegisterNextButton>
              </div>

              <RegisterNextButton />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='flex h-[579px] flex-col px-10 py-20'>
              <p className='pt-12 text-lg font-bold'>
                {`Do you have a campaign that you want to get started in Codecoco now?`}
              </p>

              <div className='flex flex-col gap-4  pl-2 pt-5'>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  yes, let’s get started.
                </RegisterNextButton>
                <RegisterNextButton className='btn-secondary btn w-3/5 lowercase'>
                  no, just wanted to look around.
                </RegisterNextButton>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}
