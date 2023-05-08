import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import Image from 'next/image'
import registerImage from '../../public/assets/register/registerFlow.png'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation } from 'swiper'
import { PT_Mono } from 'next/font/google'
import RegisterNextButton from './registerNextButton'

const ptMono = PT_Mono({ weight: '400', subsets: ['latin'] })

export default function RegisterFlow() {
    const swiper = useSwiper();
  return (
    <section className='flex w-[1000px] flex-row items-center justify-center rounded-2xl bg-background bg-opacity-20'>
      <div className='relative h-[579px] w-64'>
        <Image src={registerImage} fill alt='register-image' />
      </div>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView={1}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='w-full'>
        <SwiperSlide>
          <div className='flex h-[579px] flex-col px-10 py-20'>
            <h1 className={`${ptMono.className} text-2xl opacity-80`}>
              welcome Sophia!, 🥥
            </h1>
            <p className='text-lg font-bold'>
              {`Let’s get your account set up right. What best describes your
              work?`}
            </p>

            <div className='flex flex-col gap-4'>
              <label className='flex flex-row gap-1 items-center'>
                <input type='radio' name='option' value='option1' />
                <p>Option 1</p>
              </label>

              <label className='flex flex-row gap-1 items-center'>
                <input type='radio' name='option' value='option2' />
                <p>Option 2</p>
              </label>

              <label className='flex flex-row gap-1 items-center'>
                <input type='radio' name='option' value='option3' />
                <p>Option 3</p>
              </label>
            </div>

            <RegisterNextButton/>
          </div>
        </SwiperSlide>
        <SwiperSlide className='text-center'>Slide 2</SwiperSlide>
        <SwiperSlide className='text-center'>Slide 3</SwiperSlide>
        <SwiperSlide className='text-center'>Slide 4</SwiperSlide>
        <SwiperSlide className='text-center'>Slide 5</SwiperSlide>
        <SwiperSlide className='text-center'>Slide 6</SwiperSlide>v
        <SwiperSlide className='text-center'>Slide 7</SwiperSlide>
        <SwiperSlide className='text-center'>Slide 8</SwiperSlide>
        <SwiperSlide className='text-center'>Slide 9</SwiperSlide>
      </Swiper>
    </section>
  )
}
