import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import cocoImage from 'public/assets/register/cocoIcon.svg'
import shareCard from 'public/assets/register/section3Image.jpg'

export default function Stats() {
  return (
    <>
      <Image
        src={shareCard}
        className='h-[492px] w-full object-cover'
        alt={''}
      />
      <div>
        <div className='absolute right-[20px] lg:right-1/2 -mt-[210px] lg:-mt-[370px]  w-[290px] lg:w-[500px]  gap-1 lg:gap-2   '>
          <div className='border-2 border-borderCards bg-white  leading-5 shadow-[1px_1px_2px_0px_#e6e6e646] px-6 py-4 lg:px-10 lg:py-8 rounded-md'>
            <Image
              src={cocoImage}
              className='absolute lg:-ml-[55px] lg:-mt-[50px] -ml-[38px] -mt-[38px] w-9'
              alt={''}
            />
            <h4 className='text-base lg:text-2xl font-bold'>
              Get all your creators’ stats
            </h4>
            <p className={`text-xs lg:text-base ${ptMono.className}`}>
              Invite your creators to connect to your account and campaigns to
              get more detailed stats for their posts automatically.{' '}
            </p>
          </div>
          <button className='bg-[#DEF4EA] rounded-full py-3 px-8 font-medium mt-6'>
            learn more 🥥
          </button>
        </div>
      </div>
    </>
  )
}
