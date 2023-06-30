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
        <div className='absolute right-1/4 -mt-[370px] flex w-[500px] flex-col gap-2 rounded-2xl border-2 border-borderCards bg-target px-10 py-8 leading-5 shadow-[1px_2px_5px_0px_#e6e6e6]'>
          <Image
            src={cocoImage}
            className='absolute -ml-[55px] -mt-[50px] w-9'
            alt={''}
          />
          <h4 className='text-2xl font-bold'>Get all your creators’ stats</h4>
          <p className={`${ptMono.className}`}>
            Invite your creators to connect to your account and campaigns to get
            more detailed stats for their posts automatically.{' '}
          </p>
        </div>
      </div>
    </>
  )
}
